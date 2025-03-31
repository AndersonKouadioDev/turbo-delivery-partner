import { ButtonBack } from "@/components/ui/navigation-ui/button-back";
import { title } from "@/components/primitives";
import Content from "./content";
import { Divider } from "@heroui/react";

export default function Help() {
  return (
    <div className="w-full h-full gap-4 lg:gap-6">
      <ButtonBack
        className="bg-background"
        link="/settings"
        size="sm"
      />
      <div className="space-y-4 mt-4">
        <h1 className={title({ size: "h3", class: "text-primary" })}>
          Aide et assistance
        </h1>
        <Divider />
        <Content />
      </div>
    </div>
  );
}
