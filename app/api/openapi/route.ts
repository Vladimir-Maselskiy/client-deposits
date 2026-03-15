import { NextResponse } from "next/server";
import { openApiDocument } from "@/lib/openapi/document";

export function GET() {
  return NextResponse.json(openApiDocument);
}
