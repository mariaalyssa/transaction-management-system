declare module "swagger-ui-express" {
  import { RequestHandler } from "express";

  export interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerUrl?: string;
    swaggerOptions?: Record<string, unknown>;
    customCss?: string;
    customSiteTitle?: string;
    customfavIcon?: string;
    customJs?: string;
    [key: string]: unknown;
  }

  export const serve: RequestHandler;
  export function setup(
    swaggerDoc: object,
    options?: SwaggerUiOptions,
    customCss?: string,
    customfavIcon?: string
  ): RequestHandler;

  const swaggerUi: {
    serve: RequestHandler;
    setup(
      swaggerDoc: object,
      options?: SwaggerUiOptions,
      customCss?: string,
      customfavIcon?: string
    ): RequestHandler;
  };

  export default swaggerUi;
}

declare module "swagger-jsdoc" {
  export interface SwaggerJSDocOptions {
    definition: Record<string, any>;
    apis?: string[];
    [key: string]: any;
  }

  export default function swaggerJSDoc(options: SwaggerJSDocOptions): object;
}
