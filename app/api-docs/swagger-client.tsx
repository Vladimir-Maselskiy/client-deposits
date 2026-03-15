"use client";

import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-dist/swagger-ui-bundle";
import "swagger-ui-dist/swagger-ui.css";

type Props = {
  specUrl: string;
};

export function SwaggerClient({ specUrl }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const ui = SwaggerUI({
      url: specUrl,
      domNode: containerRef.current,
      docExpansion: "list",
      defaultModelsExpandDepth: 1,
    });

    return () => {
      ui?.destroy?.();
    };
  }, [specUrl]);

  return <div ref={containerRef} />;
}
