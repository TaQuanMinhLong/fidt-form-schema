import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/arktype.ts", "./src/zod.ts"],
  format: ["esm", "cjs"],
  external: ["arktype", "zod"],
  target: ["es2024"],
  clean: true,
});
