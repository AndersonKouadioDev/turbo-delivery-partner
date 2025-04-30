"use client";
import { ButtonBack } from "@/components/ui/navigation-ui/button-back";
import { title } from "@/components/primitives";
import { Listbox, ListboxItem } from "@heroui/react";
import { Check, LanguagesIcon } from "lucide-react";
import { Divider } from "@heroui/react";

export default function Languages() {
  return (
    <div className="w-full h-full gap-4 lg:gap-6">
      <ButtonBack
        className="bg-background"
        link="/settings"
        size="sm"
      />
      <div className="space-y-4 mt-4">
        <h1 className={title({ size: "h3", class: "text-primary" })}>
          Langues
        </h1>
        <Divider />
        <div className="w-full h-full p-4 space-y-6">
          <Listbox
            variant="light"
            aria-label="Listbox menu settings"
            itemClasses={{
              base: "px-3 md:gap-10 my-4 md:my-6",
            }}
          >
            <ListboxItem
              key={"french"}
              startContent={<LanguagesIcon className="w-4 h-4 md:w-6 md:h-6" />}
              endContent={
                <Check className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              }
            >
              <p className="md:text-lg">Français</p>
            </ListboxItem>
            <ListboxItem
              key={"english"}
              startContent={<LanguagesIcon className="w-4 h-4 md:w-6 md:h-6" />}
              endContent={<Check className="w-4 h-4 md:w-6 md:h-6" />}
            >
              <p className="md:text-lg">Anglais</p>
            </ListboxItem>
          </Listbox>
        </div>
      </div>
    </div>
  );
}
