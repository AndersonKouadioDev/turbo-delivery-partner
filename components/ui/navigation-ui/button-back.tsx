'use client';

import { Button, ButtonProps } from "@heroui/react";
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children?: ReactNode;
  link?: string;
}
export function ButtonBack({
  children = "Retour",
  link,
  ...props
}: Props): JSX.Element {
  const router = useRouter();

  return (
    <Button
      startContent={<IconChevronLeft size={20} />}
      variant="light"
      onClick={() => (link ? router.push(link) : router.back())}
      {...props}
    >
      {children}
    </Button>
  );
}
