declare module "swagger-ui-dist/swagger-ui-bundle" {
  type SwaggerUiOptions = {
    url?: string;
    domNode: Element;
    docExpansion?: "list" | "full" | "none";
    defaultModelsExpandDepth?: number;
  };

  type SwaggerUiInstance = {
    destroy?: () => void;
  };

  export default function SwaggerUI(options: SwaggerUiOptions): SwaggerUiInstance;
}
