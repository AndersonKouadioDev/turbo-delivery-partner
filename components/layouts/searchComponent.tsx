'use client';
import { useState } from 'react';
import IconSearch from '@/components/icon/icon-search';
import IconXCircle from '@/components/icon/icon-x-circle';
const searchComponent = () => {
    const [search, setSearch] = useState(false);

    return (
        <>
            <form
                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
            >
                <div className="relative">
                    <input
                        type="text"
                        className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                        placeholder="Search..."
                    />
                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                        <IconSearch className="mx-auto" />
                    </button>
                    <button type="button" className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden" onClick={() => setSearch(false)}>
                        <IconXCircle />
                    </button>
                </div>
            </form>
            <button type="button" onClick={() => setSearch(!search)} className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden">
                <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
            </button>
        </>
    );
};

export default searchComponent;
