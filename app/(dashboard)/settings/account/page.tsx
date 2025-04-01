import { ButtonBack } from '@/components/ui/navigation-ui/button-back';
import { title } from '@/components/primitives';
import { AccountForm } from '@/components/dashboard/settings/account/account-form';
import { Divider } from "@heroui/react";
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Account() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/auth');
    }

    return (
        <div className="w-full h-full gap-4 lg:gap-6">
            <ButtonBack className="bg-background" link="/settings" size="sm" />
            <div className="space-y-4 mt-4">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Compte</h1>
                <Divider />
                <AccountForm account={session?.user} />
            </div>
        </div>
    );
}
