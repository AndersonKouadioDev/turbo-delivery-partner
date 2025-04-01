'use client';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { toggleTheme } from '@/store/themeConfigSlice';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import { useTheme } from 'next-themes';
import { Button, ButtonProps } from "@heroui/react";
const ThemeSwitch = ({ className, size }: { className?: string; size?: ButtonProps['size'] }) => {
    const dispatch = useDispatch();
    const { setTheme } = useTheme();

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    return (
        <div>
            {themeConfig.theme === 'light' ? (
                <Button
                    isIconOnly
                    size={size}
                    className={`${
                        themeConfig.theme === 'light' &&
                        `flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60 ${className}`
                    }`}
                    onClick={() => {
                        dispatch(toggleTheme('dark'));
                        setTheme('dark');
                    }}
                >
                    <IconSun />
                </Button>
            ) : (
                ''
            )}
            {themeConfig.theme === 'dark' && (
                <Button
                    isIconOnly
                    size={size}
                    className={`${
                        themeConfig.theme === 'dark' &&
                        `flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60 ${className}`
                    }`}
                    onClick={() => {
                        dispatch(toggleTheme('system'));
                        setTheme('system');
                    }}
                >
                    <IconMoon />
                </Button>
            )}
            {themeConfig.theme === 'system' && (
                <Button
                    isIconOnly
                    size={size}
                    className={`${
                        themeConfig.theme === 'system' &&
                        `flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60 ${className}`
                    }`}
                    onClick={() => {
                        dispatch(toggleTheme('light'));
                        setTheme('light');
                    }}
                >
                    <IconLaptop />
                </Button>
            )}
        </div>
    );
};

export default ThemeSwitch;
