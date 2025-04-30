import { Input, Kbd } from "@heroui/react";
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

export default function Search() {
    return (
        <>
            <Input
                aria-label="Search"
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm',
                }}
                endContent={
                    <Kbd className="hidden lg:inline-block" keys={['command']}>
                        K
                    </Kbd>
                }
                labelPlacement="outside"
                placeholder="Search..."
                startContent={<IconSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
                type="search"
            />
        </>
    );
}
