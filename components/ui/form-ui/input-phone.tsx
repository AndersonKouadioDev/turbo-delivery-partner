'use client';

import PhoneInput, { formatPhoneNumberIntl, isPossiblePhoneNumber, Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Input as InputNextUI } from '@nextui-org/react';
import { forwardRef, useMemo } from 'react';

import { cn } from '@/lib/utils';
interface InputPhoneProps extends React.ComponentPropsWithoutRef<typeof PhoneInput> {
    value: string;
    setValue: (value: Value | string) => void;
}

const InputPhone = forwardRef<React.ElementRef<typeof PhoneInput>, InputPhoneProps>((props, ref) => {
    const { className, value, setValue, ...otherProps } = props;

    const handleSelectionChange = (value: Value) => {
        if (value) {
            const formattedValue = formatPhoneNumberIntl(value);

            setValue(formattedValue.replace('+', ''));
        }
    };

    const isContactValid = useMemo((): boolean => {
        if (value == '' || (value && isPossiblePhoneNumber(value))) return true;

        return false;
    }, [value]);

    return (
        <PhoneInput
            ref={ref} // Ajout de la prop ref ici
            international
            aria-label="phone_number input"
            className={cn('disabled:cursor-not-allowed', className)}
            countryCallingCodeEditable={false}
            errorMessage={!isContactValid ? 'Numéro incorrete' : ''}
            initialValueFormat="national"
            inputComponent={InputNextUI}
            placeholder="Entrer votre numéro de téléphone"
            defaultCountry="CI"
            value={value}
            onChange={handleSelectionChange}
            {...otherProps}
        />
    );
});

InputPhone.displayName = 'InputPhone';

export { InputPhone };
