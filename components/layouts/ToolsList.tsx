'use client';

import Link from 'next/link';
import IconCalendar from '@/components/icon/icon-calendar';
import IconEdit from '@/components/icon/icon-edit';
import IconChatNotification from '@/components/icon/icon-chat-notification';

const ToolsList = () => {
    return (
        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <li>
                <Link href="/apps/calendar" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
                    <IconCalendar />
                </Link>
            </li>
            <li>
                <Link href="/apps/todolist" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
                    <IconEdit />
                </Link>
            </li>
            <li>
                <Link href="/apps/chat" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
                    <IconChatNotification />
                </Link>
            </li>
        </ul>
    );
};

export default ToolsList;
