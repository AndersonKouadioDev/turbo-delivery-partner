'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Dropdown from '@/components/dropdown';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconMailDot from '@/components/icon/icon-mail-dot';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import IconInfoCircle from '@/components/icon/icon-info-circle';

const MessageList = ({ className }: { className?: string }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    function createMarkup(messages: any) {
        return { __html: messages };
    }
    const [messages, setMessages] = useState([
        {
            id: 1,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
            title: 'Congratulations!',
            message: 'Your OS has been updated.',
            time: '1hr',
        },
        {
            id: 2,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
            title: 'Did you know?',
            message: 'You can switch between artboards.',
            time: '2hr',
        },
        {
            id: 3,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
            title: 'Something went wrong!',
            message: 'Send Reposrt',
            time: '2days',
        },
        {
            id: 4,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
            title: 'Warning',
            message: 'Your password strength is low.',
            time: '5days',
        },
    ]);

    const removeMessage = (value: number) => {
        setMessages(messages.filter((user) => user.id !== value));
    };

    return (
        <div className={`dropdown shrink-0 ${className}`}>
            <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={<IconMailDot />}
            >
                <ul className="w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
                    <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                        <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md p-5 text-white hover:!bg-transparent">
                            <div className="bg- absolute inset-0 h-full w-full bg-[url(/assets/images/menu-heade.jpg)] bg-cover bg-center bg-no-repeat"></div>
                            <h4 className="relative z-10 text-lg font-semibold">Messages</h4>
                        </div>
                    </li>
                    {messages.length > 0 ? (
                        <ul>
                            <li onClick={(e) => e.stopPropagation()}>
                                {messages.map((message) => {
                                    return (
                                        <div key={message.id} className="flex items-center px-5 py-3">
                                            <div dangerouslySetInnerHTML={createMarkup(message.image)}></div>
                                            <span className="px-3 dark:text-gray-500">
                                                <div className="text-sm font-semibold dark:text-white-light/90">{message.title}</div>
                                                <div>{message.message}</div>
                                            </span>
                                            <span className="whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-dark/60 ltr:ml-auto ltr:mr-2 rtl:ml-2 rtl:mr-auto dark:text-white-dark">
                                                {message.time}
                                            </span>
                                            <button type="button" className="text-neutral-300 hover:text-danger" onClick={() => removeMessage(message.id)}>
                                                <IconXCircle />
                                            </button>
                                        </div>
                                    );
                                })}
                            </li>
                            <li className="mt-5 border-t border-white-light text-center dark:border-white/10">
                                <button type="button" className="group !h-[48px] justify-center !py-4 font-semibold text-primary dark:text-gray-400">
                                    <span className="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>
                                    <IconArrowLeft className="transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1" />
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                                <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                                    <IconInfoCircle fill={true} className="h-10 w-10" />
                                </div>
                                No data available.
                            </button>
                        </li>
                    )}
                </ul>
            </Dropdown>
        </div>
    );
};

export default MessageList;
