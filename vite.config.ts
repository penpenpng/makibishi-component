import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const entry = (name: string) => path.resolve(import.meta.dirname, "src", name);

export default defineConfig({
  build: {
    lib: {
      name: "makibishi-component",
      fileName: (_, name) => `${name}.js`,
      entry: {
        ["makibishi"]: entry("index.ts"),
        ["makibishi-widget"]: entry("makibishi-widget.ts"),
        ["components/index"]: entry("components/index.ts"),
      },
      formats: ["es"],
    },
    sourcemap: true,
  },
  plugins: [dts()],
});
