import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Input } from "@heroui/react";
import { InputPhone } from '@/components/ui/form-ui/input-phone';
import 'react-phone-number-input/style.css';

import { _createRestaurantSchema } from '@/src/schemas/restaurants.schema';
import SearchAddressAutocomplete from './search-address-autocomplete';

interface FormStepProps {
    errors: FieldErrors<_createRestaurantSchema>;
    control: Control<_createRestaurantSchema>;
    setValue: UseFormSetValue<_createRestaurantSchema>;
}

export const AddressRestauForm: React.FC<FormStepProps> = ({ errors, control, setValue }) => {
    return (
        <div className="">
            <div className="grid gap-y-4">
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-label="email input"
                            errorMessage={errors.email?.message ?? ''}
                            isInvalid={!!errors.email}
                            label="Email de l'établissement"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Entrez l'email de l'établissement"
                            type="email"
                            value={field.value ?? ''}
                            variant="bordered"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="telephone"
                    render={({ field }) => (
                        <InputPhone
                            isRequired
                            aria-invalid={errors.telephone ? 'true' : 'false'}
                            errorMessage={errors.telephone?.message ?? ''}
                            isInvalid={!!errors.telephone}
                            label="Numéro de téléphone de l'établissement"
                            name="telephone"
                            placeholder="Entrez le numéro de téléphone de l'établissement"
                            setValue={(value: string) => {
                                field.onChange(value);
                            }}
                            type="text"
                            value={field.value ?? ''}
                            variant="bordered"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="codePostal"
                    render={({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            aria-invalid={errors.codePostal ? 'true' : 'false'}
                            aria-label="codePostal input"
                            errorMessage={errors.codePostal?.message ?? ''}
                            isInvalid={!!errors.codePostal}
                            label="Code postal"
                            labelPlacement="outside"
                            name="codePostal"
                            placeholder="Entrez le code postal"
                            value={field.value ?? ''}
                            variant="bordered"
                        />
                    )}
                />
                <SearchAddressAutocomplete errors={errors} control={control} setValue={setValue} />
            </div>
        </div>
    );
};
