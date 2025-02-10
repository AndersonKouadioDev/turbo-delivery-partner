import { z } from 'zod';

// Définition d'un type utilitaire pour extraire le type d'un champ du schéma
type SchemaField<T extends z.ZodTypeAny> = T extends z.ZodType<infer U> ? U : never;

/**
 * Options pour l'extraction des données du FormData
 */
interface ExtractFormDataOptions {
    keyTransforms?: Record<string, string>;
    excludeFields?: string[];
    includeFields?: string[];
}

export function extractFormData(data: FormData | Record<string, unknown>, options: ExtractFormDataOptions = {}): Record<string, unknown> {
    const { keyTransforms = {}, excludeFields = [], includeFields } = options;
    const result: Record<string, unknown> = {};

    // Fonction helper pour déterminer si une clé doit être traitée
    const shouldProcessKey = (key: string): boolean => {
        if (excludeFields.includes(key)) return false;
        if (includeFields && !includeFields.includes(key)) return false;
        return true;
    };

    // Fonction helper pour transformer la clé
    const transformKey = (key: string): string => {
        return keyTransforms[key] || key;
    };

    if (data instanceof FormData) {
        // Traitement pour FormData
        const processedKeys = new Set<string>();

        data.forEach((value, key) => {
            if (!shouldProcessKey(key)) return;

            const transformedKey = transformKey(key);

            if (!processedKeys.has(key)) {
                const allValues = data.getAll(key);
                result[transformedKey] = allValues.length > 1 ? allValues : allValues[0];
                processedKeys.add(key);
            }
        });
    } else {
        // Traitement pour objet JavaScript
        Object.entries(data).forEach(([key, value]) => {
            if (!shouldProcessKey(key)) return;

            const transformedKey = transformKey(key);
            result[transformedKey] = value;
        });
    }

    return result;
}

export const extractZodErrors = (validationResult: z.SafeParseReturnType<any, any>): { [key: string]: string } => {
    if (validationResult.success) return {};

    const errors: { [key: string]: string } = {};

    validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join('.');

        errors[path] = issue.message;
    });

    return errors;
};

export const extractZodErrorsInArray = (validationResult: z.SafeParseReturnType<any, any>): { key: string; message: string }[] => {
    if (validationResult.success) return [];

    const errors: { key: string; message: string }[] = [];

    validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join('.');

        errors.push({ key: path, message: issue.message });
    });

    return errors;
};

export function createDynamicSchema<T extends z.ZodRawShape>(baseSchema: z.ZodObject<T>, data: Record<string, unknown>): z.ZodObject<z.ZodRawShape> {
    const dynamicSchema: z.ZodRawShape = {};

    for (const key in data) {
        if (key in baseSchema.shape) {
            dynamicSchema[key] = baseSchema.shape[key];
        } else {
            // Pour les champs non définis dans le schéma de base, on utilise z.unknown()
            dynamicSchema[key] = z.unknown();
        }
    }

    return z.object(dynamicSchema);
}

export function validateWithDynamicSchema<T extends z.ZodRawShape>(
    baseSchema: z.ZodObject<T>,
    data: Record<string, unknown>,
): z.SafeParseReturnType<z.infer<z.ZodObject<z.ZodRawShape>>, z.infer<z.ZodObject<z.ZodRawShape>>> {
    const dynamicSchema = createDynamicSchema(baseSchema, data);

    return dynamicSchema.safeParse(data);
}

export function transformFormData(data: Record<string, unknown>, transformations: Record<string, (value: unknown) => unknown>): Record<string, unknown> {
    const transformedData: Record<string, unknown> = { ...data };

    for (const [key, transform] of Object.entries(transformations)) {
        if (key in data) {
            transformedData[key] = transform(data[key]);
        }
    }

    return transformedData;
}

export function handleError(error: any, prevState: any, defaultMessage: string): any {
    prevState.message = defaultMessage;
    prevState.status = 'error';
    prevState.code = error.code;

    return prevState;
}

export function createFormData(formData: Record<string, unknown>): FormData {
    const sendFormData = new FormData();

    function appendFormData(key: string, value: unknown) {
        // Cas null ou undefined
        if (value === null || value === undefined) {
            sendFormData.append(key, '');
            return;
        }

        // Cas File
        if (value instanceof File) {
            sendFormData.append(key, value, value.name);
            return;
        }

        // Cas Blob
        if (value instanceof Blob) {
            sendFormData.append(key, value);
            return;
        }

        // Cas Date
        if (value instanceof Date) {
            sendFormData.append(key, value.toISOString());
            return;
        }

        // Cas tableau
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                // Pour les tableaux imbriqués ou objets dans les tableaux
                if (Array.isArray(item) || isObject(item)) {
                    appendFormData(`${key}[${index}]`, item);
                } else {
                    appendFormData(`${key}`, item);
                }
            });
            return;
        }

        // Cas objet (excluant les types spéciaux déjà traités)
        if (isObject(value)) {
            Object.entries(value).forEach(([propertyKey, propertyValue]) => {
                appendFormData(`${key}[${propertyKey}]`, propertyValue);
            });
            return;
        }

        // Cas des types primitifs (string, number, boolean)
        sendFormData.append(key, String(value));
    }

    // Fonction utilitaire pour vérifier si une valeur est un objet
    function isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null && !(value instanceof File) && !(value instanceof Blob) && !(value instanceof Date) && !Array.isArray(value);
    }

    // Traitement de chaque entrée du formData initial
    Object.entries(formData).forEach(([key, value]) => {
        appendFormData(key, value);
    });

    return sendFormData;
}

/**
 * Options pour le traitement des données du FormData
 */
interface ProcessFormDataOptions<T extends z.ZodRawShape> extends ExtractFormDataOptions {
    useDynamicValidation?: boolean;
    transformations?: {
        [K in keyof T]?: (value: SchemaField<T[K]>) => SchemaField<T[K]>;
    };
}

export function processFormData<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    formData: FormData | Record<string, unknown>,
    options: ProcessFormDataOptions<T> = {},
): {
    success: boolean;
    data: z.infer<z.ZodObject<T>>;
    errors?: Record<string, string>;
    errorsInArray?: { key: string; message: string }[];
} {
    const { useDynamicValidation = true, transformations = {}, ...extractOptions } = options;

    // Extraire les données du FormData
    const extractedData = extractFormData(formData, extractOptions);

    // Transformer les données si des transformations sont spécifiées
    const transformedData = transformFormData(extractedData, transformations as any);

    // Valider les données
    const validationResult = useDynamicValidation ? validateWithDynamicSchema(schema, transformedData) : schema.safeParse(transformedData);

    if (validationResult.success) {
        return {
            success: true,
            data: validationResult.data as z.infer<z.ZodObject<T>>,
        };
    } else {
        return {
            success: false,
            data: transformedData as z.infer<z.ZodObject<T>>,
            errors: extractZodErrors(validationResult),
            errorsInArray: extractZodErrorsInArray(validationResult),
        };
    }
}
