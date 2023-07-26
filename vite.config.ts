import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { transform } from "esbuild";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
  },
  plugins: [
    {
      name: "minifyEsm",
      renderChunk: {
        order: "post",
        handler: async (code, _, { format }) => {
          if (format === "es") {
            return await transform(code, {
              minify: true,
            });
          }
          return code;
        },
      },
    },
    dts(),
  ],
});
