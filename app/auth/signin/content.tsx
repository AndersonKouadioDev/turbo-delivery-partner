"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { FormEmail } from "@/components/auth/form-email";
import { FormOTP } from "@/components/auth/form-otp";
import { FormUserInfo } from "@/components/auth/form-user-info";
import { ButtonBack } from "@/components/ui/navigation-ui/button-back";

export default function Content() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-2/3 relative">
        <Image
          src="/assets/images/photos/img (1).jpg"
          alt="Login background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-secondary to-primary">
        <div className="absolute top-2 left-2">
          <ButtonBack className="bg-background" variant="solid" size="sm" />
        </div>
        {!step ? (
          <FormEmail />
        ) : step == "2" ? (
          <FormOTP />
        ) : step == "3" ? (
          <FormUserInfo />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
