import React, { Suspense } from "react";
import Content from "./content";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}
