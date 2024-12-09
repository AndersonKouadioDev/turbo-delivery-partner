"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  children?: ReactNode;
}
export function ButtonNext({
  children = "Suivant",
  ...props
}: Props): JSX.Element {
  const router = useRouter();

  return (
    <Button
      startContent={<IconChevronRight size={20} />}
      variant="light"
      onClick={() => router.back()}
      {...props}
    >
      {children}
    </Button>
  );
}
