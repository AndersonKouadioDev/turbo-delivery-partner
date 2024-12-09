'use client';

import { FormLogin } from '@/components/auth/form-login';
import { body, title } from '@/components/primitives';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthContent() {
    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:block lg:w-2/3 relative">
                <Image src="/assets/images/photos/img (1).jpg" alt="Login background" layout="fill" objectFit="cover" objectPosition="center" />
            </div>
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-secondary to-primary">
                <div className="w-full max-w-md space-y-8 bg-background p-10 rounded-lg shadow-xl">
                    <div className="text-center">
                        <h2 className={title({ size: 'h3' })}>Faîtes livrez vos plats partout !</h2>
                        <p className={body({ size: 'caption', class: 'mt-4' })}>Veuillez vous connecter à votre compte</p>
                    </div>
                    <FormLogin />
                    <div className="text-center">
                        <p
                            className={body({
                                size: 'caption',
                                class: 'mt-2 text-sm text-gray-600',
                            })}
                        >
                            Vous n&apos;avez pas de compte ?{' '}
                            <Link href="/auth/signin" className="text-primary hover:underlined">
                                S&apos;inscrire
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
