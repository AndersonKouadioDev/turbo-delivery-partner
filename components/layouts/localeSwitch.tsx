'use client';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { toggleRTL } from '@/store/themeConfigSlice';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getTranslation } from '@/i18n';

const LocaleSwitch = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { i18n } = getTranslation();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const setLocale = (flag: string) => {
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
        router.refresh();
    };

    return (
        <Dropdown
            classNames={{
                base: 'before:bg-default-200 shrink-0', // change arrow background
                content: 'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
            }}
            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
        >
            <DropdownTrigger>
                <Avatar
                    showFallback
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={i18n.language?.slice(0, 1).toUpperCase()}
                    size="sm"
                    src={`/assets/images/flags/${i18n.language?.toUpperCase()}.svg`}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                {themeConfig.languageList.map((item: any) => {
                    return (
                        <DropdownItem
                            key={item.code}
                            onClick={() => {
                                i18n.changeLanguage(item.code);
                                setLocale(item.code);
                            }}
                            className={`${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                            startContent={
                                <Avatar
                                    showFallback
                                    as="button"
                                    className="transition-transform w-5 h-5 object-cover"
                                    color="primary"
                                    name={item.code.toUpperCase()}
                                    size="sm"
                                    src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                                />
                            }
                        >
                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
};

export default LocaleSwitch;
