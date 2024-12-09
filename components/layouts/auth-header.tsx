'use client';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

import ThemeSwitch from './themeSwitch';
import LocaleSwitch from './localeSwitch';
import { ButtonBack } from '../ui/navigation-ui/button-back';

const AuthHeader = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="relative shadow-sm flex justify-between items-center w-full bg-white px-5 py-2.5 dark:bg-black">
                <div className="flex items-center justify-between ltr:mr-2 rtl:ml-2 ">
                    <ButtonBack />
                </div>

                <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                    <ThemeSwitch />
                    <LocaleSwitch />
                </div>
            </div>
        </header>
    );
};

export default AuthHeader;
