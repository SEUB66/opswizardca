import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// Clean, self-contained TanStack Start config — no proprietary wrappers.
// `tanstackStart()` handles SSR, the file-based router (route-tree generation)
// and the Nitro server build; `vite-tsconfig-paths` wires the @/* alias.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
