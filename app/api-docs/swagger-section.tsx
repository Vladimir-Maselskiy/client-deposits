"use client";

import nextDynamic from "next/dynamic";

const SwaggerClient = nextDynamic(
  () => import("./swagger-client").then((module) => module.SwaggerClient),
  {
    ssr: false,
  },
);

export function SwaggerSection() {
  return <SwaggerClient specUrl="/api/openapi" />;
}
