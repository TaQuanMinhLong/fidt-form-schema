import type { StandardSchemaV1 as Schema } from "@standard-schema/spec";
import type { type } from "arktype";
import type { z } from "zod";

export type SupportedSchema = "string" | "number" | "email"; // ... more schema

export type ValidationRule = {
  type: SupportedSchema;
  message?: string;
  // ... more properties
};

export type SchemaError<T extends Schema> = T extends z.ZodSchema
  ? { issues: z.ZodIssue[] }
  : T extends type.Any
    ? type.errors
    : never;

export type SchemaResult<T extends Schema> =
  | SchemaError<T>
  | Schema.SuccessResult<Schema.InferOutput<T>>;

export async function validate<T extends Schema>(schema: T, input: Schema.InferInput<T>) {
  let result = schema["~standard"].validate(input);
  if (result instanceof Promise) result = await result;
  return result as SchemaResult<T>;
}
