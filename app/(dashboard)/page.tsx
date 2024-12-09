import React, { Suspense } from "react";
import Content from "./home/content";
import Loading from "@/components/layouts/loading";

export default async function Page() {
  return (
    <Suspense fallback={<Loading/>}>
      <Content />
    </Suspense>
  );
}
