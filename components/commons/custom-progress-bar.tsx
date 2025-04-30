"use client"
import React from 'react';

interface CustomProgressBarProps {
    position: number;
    nomPrenom: string;
    progress: number;

}
function CustomProgressBar({ position, nomPrenom, progress }: CustomProgressBarProps) {
    return (
        <div className=" h-full bg-gradient-to-r from-orange-200 to-orange-400 flex items-center z-index-[1000] rounded-lg"
            style={{ width: `${progress}%` }}>
            <div className="flex items-center gap-4 text-sm font-bold">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                        src={"/assets/images/photos/avatar-2.png"}
                        alt={"Avatar"}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>{nomPrenom}</div>
            </div>
        </div>
    );
}

export default CustomProgressBar;
