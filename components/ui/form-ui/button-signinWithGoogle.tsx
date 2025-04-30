'use client';

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function ButtonSigninWithGoogle({ redirectTo = '/' }: { redirectTo?: string }) {
    const [pending, setPending] = useState(false);

    return (
        <Button
            className="bg-background border py-1"
            endContent={<FcGoogle size={24} />}
            isLoading={pending}
            variant="shadow"
            onClick={async () => {
                setPending(true);
                await signIn('google', { redirectTo });
                setPending(false);
            }}
        >
            Continuer avec Google
        </Button>
    );
}
