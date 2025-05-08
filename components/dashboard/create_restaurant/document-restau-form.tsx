import { Control, Controller, FieldErrors } from 'react-hook-form';
import { DateInput } from '@heroui/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { _createRestaurantSchema } from '@/src/schemas/restaurants.schema';

interface FormStepProps {
    errors: FieldErrors<_createRestaurantSchema>;
    control: Control<_createRestaurantSchema>;
}

export const DocumentRestauForm: React.FC<FormStepProps> = ({ errors, control }) => {
    return (
        <div className="">
            <div className="grid gap-y-4">
                <Controller
                    name="logoUrl"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="logoUrl">Logo de l&apos;établissement</Label>
                            <Input {...field} type="file" accept=".jpg,.png,.jpeg" onChange={(e) => onChange(e.target.files?.[0])} required />
                        </div>
                    )}
                />
                <Controller
                    name="cniUrl"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="cniUrl">CNI</Label>
                            <Input {...field} type="file" accept=".pdf" onChange={(e) => onChange(e.target.files?.[0])} required />
                        </div>
                    )}
                />
                <Controller
                    name="docUrl"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="docUrl">Document de l&apos;établissement</Label>
                            <Input {...field} type="file" accept=".pdf" onChange={(e) => onChange(e.target.files?.[0])} required />
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="dateService"
                    render={({ field: { onChange, value, ...field } }) => {
                        console.log("value", value)
                        return (
                            <DateInput
                                {...field}
                                isRequired
                                aria-invalid={errors.dateService ? 'true' : 'false'}
                                aria-label="dateService input"
                                errorMessage={errors.dateService?.message ?? ''}
                                isInvalid={!!errors.dateService}
                                label="Date de début de service"
                                labelPlacement="outside"
                                name="dateService"
                                onChange={(value: any) => {
                                    if (value?.year && value?.month && value?.day) {
                                        const nativeDate = new Date(value.year, value?.month - 1, value.day);
                                        onChange(nativeDate?.toISOString().slice(0, 10))
                                    } else {
                                        onChange(value?.toString());
                                    }
                                }}
                                variant="bordered"
                            />
                        )
                    }}
                />
            </div>
        </div>
    );
};
