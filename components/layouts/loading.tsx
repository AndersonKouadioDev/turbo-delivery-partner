import React from 'react';
import { Logo } from '../icons';

const Loading = () => {
    return (
        <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#0b0304]">
            <Logo />
        </div>
    );
};

export default Loading;
