"use client";

import { Button, ButtonProps } from "@heroui/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  children: ReactNode;
}
export function SubmitButton({ children, ...props }: Props): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="w-full"
      color="primary"
      disabled={pending}
      isLoading={pending}
      type="submit"
      {...props}
    >
      {children}
    </Button>
  );
}
