import { Suspense } from "react";

import Content from "./content";

export default function AuthPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
