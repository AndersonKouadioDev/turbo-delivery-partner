'use client';

import { body, title } from '@/components/primitives';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/form-ui/input-otp';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { registerStepSecond, resendEmail } from '@/src/actions/users.actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

export function FormOTP() {
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await registerStepSecond(prevState, formData);

            if (result.status === 'error') {
                toast.error(result.message);
            } else {
                toast.success(result.message);
                // router.push('/');
            }

            return result;
        },
        {
            data: null,
            message: '',
            errors: {},
            status: 'idle',
            code: undefined,
        },
    );

    const renvoyers = async () => {
        const result = await resendEmail();
        if (result.status === 'error') {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            // router.push('/');
        }
    }

    return (
        <div className="w-full max-w-md space-y-8 bg-background p-10 rounded-lg shadow-xl">
            <div className="text-center">
                <h2 className={title({ size: 'h3' })}>Code de validation</h2>
                <p className={body({ size: 'caption', class: 'mt-4' })}>Entrez le code reçu par mail ci-dessous pour poursuivre l&apos;inscription.</p>
            </div>
            <form action={formAction} className="mt-8 space-y-6">
                <div className="grid gap-4">
                    <InputOTP required maxLength={6} name="code">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>

                    <SubmitButton>Continuer</SubmitButton>
                </div>
            </form>
            <p
                className={body({ size: 'caption', className: 'text-center' })}
            >{`Nous vous enverrons un code de validation dans votre boîte de réception. Le code de validation peut parfois se retrouver dans les spams.`}</p>
            <p className="text-center">
                <button
                    className={body({
                        size: 'caption',
                        className: 'text-primary cursor-pointer text-center hover:underline',
                    })}
                    onClick={renvoyers}
                >
                    Renvoyer le code
                </button>
            </p>
            <div className="text-center">
                <p
                    className={body({
                        size: 'caption',
                        class: 'mt-2 text-sm text-gray-600',
                    })}
                >
                    Vous avez déjà un compte ?{' '}
                    <Link href="/auth" className="text-primary hover:underlined">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
