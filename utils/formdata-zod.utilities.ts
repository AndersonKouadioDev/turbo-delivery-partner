import { z } from 'zod';

import { ErrorDefaultCode } from '@/types/index.d';

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
/**
 * Extrait les données d'un objet FormData en gérant les valeurs multiples,
 * en transformant certaines clés, en excluant ou incluant des champs spécifiques.
 * @param formData L'objet FormData à traiter
 * @param options Options pour la transformation et le filtrage des données
 * @returns Un objet avec les clés (potentiellement transformées) et valeurs du FormData
 *
 * @example
 * const formData = new FormData();
 * formData.append('nom', 'Alice');
 * formData.append('age', '30');
 * formData.append('hobbies', 'lecture');
 * formData.append('hobbies', 'natation');
 * formData.append('ville', 'Paris');
 *
 * const data = extractFormData(formData, {
 *   keyTransforms: { nom: 'name', ville: 'city' },
 *   excludeFields: ['age'],
 *   includeFields: ['name', 'hobbies', 'city']
 * });
 * // Résultat :
 * // {
 * //   name: 'Alice',
 * //   hobbies: ['lecture', 'natation'],
 * //   city: 'Paris'
 * // }
 * // Note : 'age' est exclu, 'nom' est transformé en 'name', et 'ville' en 'city'
 */
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

/**
 * Extrait les erreurs de validation Zod dans un format plus facile à utiliser.
 * @param validationResult Le résultat de la validation Zod
 * @returns Un objet avec les chemins des erreurs comme clés et les messages d'erreur comme valeurs
 *
 * @example
 * const schema = z.object({
 *   nom: z.string(),
 *   age: z.number().min(18),
 *   email: z.string().email()
 * });
 * const result = schema.safeParse({ nom: 'Alice', age: 16, email: 'alice@example' });
 * const errors = extractZodErrors(result);
 * // Résultat :
 * // {
 * //   'age': 'Number must be greater than or equal to 18',
 * //   'email': 'Invalid email'
 * // }
 */
export const extractZodErrors = (validationResult: z.SafeParseReturnType<any, any>): { [key: string]: string } => {
    if (validationResult.success) return {};

    const errors: { [key: string]: string } = {};

    validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join('.');

        errors[path] = issue.message;
    });

    return errors;
};
export const extractZodErrorsinArray = (validationResult: z.SafeParseReturnType<any, any>): string[] => {
    if (validationResult.success) return [];

    const errors: string[] = [];

    validationResult.error.issues.forEach((issue) => {
        const path = issue.path.join('.');

        errors.push(`${path} : ${issue.message}`);
    });

    return errors;
};

/**
 * Crée un schéma Zod dynamique basé sur un schéma de base et des données.
 * @param baseSchema Le schéma Zod de base
 * @param data Les données à valider
 * @returns Un nouveau schéma Zod incluant tous les champs des données
 *
 * @example
 * const baseSchema = z.object({
 *   nom: z.string(),
 *   age: z.number()
 * });
 * const data = { nom: 'Alice', age: 30, hobby: 'lecture', ville: 'Paris' };
 * const dynamicSchema = createDynamicSchema(baseSchema, data);
 * // Résultat :
 * // {
 * //   nom: z.string(),
 * //   age: z.number(),
 * //   hobby: z.unknown(),
 * //   ville: z.unknown()
 * // }
 * // Note : 'hobby' et 'ville' sont ajoutés comme z.unknown()
 */
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

/**
 * Valide des données avec un schéma dynamique basé sur un schéma de base.
 * @param baseSchema Le schéma Zod de base
 * @param data Les données à valider
 * @returns Le résultat de la validation Zod
 *
 * @example
 * const baseSchema = z.object({
 *   nom: z.string(),
 *   age: z.number().min(18)
 * });
 * const data = { nom: 'Alice', age: 30, hobby: 'lecture' };
 * const result = validateWithDynamicSchema(baseSchema, data);
 * // Résultat :
 * // {
 * //   nom: 'Alice',
 * //   age: 30,
 * //   hobby: 'lecture'
 * // }
 * // Note : 'hobby' est inclus même s'il n'est pas dans le schéma de base
 */
export function validateWithDynamicSchema<T extends z.ZodRawShape>(
    baseSchema: z.ZodObject<T>,
    data: Record<string, unknown>,
): z.SafeParseReturnType<z.infer<z.ZodObject<z.ZodRawShape>>, z.infer<z.ZodObject<z.ZodRawShape>>> {
    const dynamicSchema = createDynamicSchema(baseSchema, data);

    return dynamicSchema.safeParse(data);
}

/**
 * Transforme les données avant la validation si nécessaire.
 * @param data Les données à transformer
 * @param transformations Un objet avec les fonctions de transformation pour chaque clé
 * @returns Les données transformées
 *
 * @example
 * const data = { age: '30', active: 'true', score: '9.5' };
 * const transformations = {
 *   age: (value) => Number(value),
 *   active: (value) => value === 'true',
 *   score: (value) => parseFloat(value)
 * };
 * const transformedData = transformFormData(data, transformations);
 * // Résultat :
 * // {
 * //   age: 30,
 * //   active: true,
 * //   score: 9.5
 * // }
 */
export function transformFormData(data: Record<string, unknown>, transformations: Record<string, (value: unknown) => unknown>): Record<string, unknown> {
    const transformedData: Record<string, unknown> = { ...data };

    for (const [key, transform] of Object.entries(transformations)) {
        if (key in data) {
            transformedData[key] = transform(data[key]);
        }
    }

    return transformedData;
}

/**
 * Gère les erreurs de manière plus structurée.
 * @param error L'erreur à gérer
 * @param prevState L'état précédent
 * @param defaultMessage Le message par défaut en cas d'erreur non gérée
 * @returns L'état mis à jour en cas d'erreur
 *
 * @example
 * const error = { code: ErrorDefaultCode.auth };
 * const prevState = { status: 'idle', message: '', code: null };
 * const updatedState = handleError(error, prevState, 'Une erreur inconnue est survenue');
 * // Résultat :
 * // {
 * //   status: 'error',
 * //   message: 'Désolé, vous devez être connecté',
 * //   code: ErrorDefaultCode.auth
 * // }
 */
export function handleError(error: any, prevState: any, defaultMessage: string): any {
    if (error.code === ErrorDefaultCode.exception) {
        prevState.message = error.message;
        prevState.status = 'error';
        prevState.code = error.code;
    } else if (error.code === ErrorDefaultCode.exception) {
        prevState.message = "Désolé, vous n'avez pas la permission requise";
        prevState.status = 'error';
        prevState.code = error.code;
    } else if (error.code === ErrorDefaultCode.auth) {
        prevState.message = 'Désolé, vous devez être connecté';
        prevState.status = 'error';
        prevState.code = error.code;
    } else {
        prevState.message = defaultMessage;
        prevState.status = 'error';
        prevState.code = error.code;
    }

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
        return typeof value === 'object' 
            && value !== null 
            && !(value instanceof File) 
            && !(value instanceof Blob) 
            && !(value instanceof Date) 
            && !Array.isArray(value);
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

/**
 * Traite les données du FormData avec options d'extraction, transformation et validation.
 * @param schema Le schéma Zod de base
 * @param formData L'objet FormData à traiter
 * @param options Options pour l'extraction, la transformation et la validation des données
 * @returns Un objet contenant le statut de succès et les données extraites
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number().min(18),
 *   email: z.string().email()
 * });
 *
 * const formData = new FormData();
 * formData.append('nom', 'Alice');
 * formData.append('age', '30');
 * formData.append('email', 'alice@example.com');
 * formData.append('hobby', 'lecture');
 *
 * const result = processFormData(schema, formData, {
 *   useDynamicValidation: true,
 *   transformations: { age: (value) => Number(value) },
 *   keyTransforms: { nom: 'name' }
 * });
 *
 * // Résultat :
 * // {
 * //   success: true,
 * //   data: {
 * //     name: 'Alice',
 * //     age: 30,
 * //     email: 'alice@example.com',
 * //     hobby: 'lecture'
 * //   }
 * // }
 */
export function processFormData<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    formData: FormData | Record<string, unknown>,
    options: ProcessFormDataOptions<T> = {},
    prevState?: any,
): {
    success: boolean;
    data: z.infer<z.ZodObject<T>>;
    errors?: Record<string, string>;
    errorsInArray?: string[];
} {
    const { useDynamicValidation = true, transformations = {}, ...extractOptions } = options;

    // Extraire les données du FormData
    const extractedData = extractFormData(formData, extractOptions);

    // Transformer les données si des transformations sont spécifiées
    const transformedData = transformFormData(extractedData, transformations as any);

    // Valider les données
    const validationResult = useDynamicValidation ? validateWithDynamicSchema(schema, transformedData) : schema.safeParse(transformedData);

    if (validationResult.success) {
        if (prevState) {
            prevState.errors = {};
            prevState.errorsInArray = [];
            prevState.message = '';
            prevState.status = 'success';
            prevState.code = undefined;
        }

        return {
            success: true,
            data: validationResult.data as z.infer<z.ZodObject<T>>,
        };
    } else {
        if (prevState) {
            prevState.errors = extractZodErrors(validationResult);
            prevState.errorsInArray = extractZodErrorsinArray(validationResult);
            prevState.message = 'Informations invalides';
            prevState.status = 'error';
            prevState.code = ErrorDefaultCode.exception;
        }

        return {
            success: false,
            data: transformedData as z.infer<z.ZodObject<T>>,
            errors: extractZodErrors(validationResult),
            errorsInArray: extractZodErrorsinArray(validationResult),
        };
    }
}
