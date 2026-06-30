import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

// Clean, self-contained TanStack Start config — no proprietary wrappers.
// `tanstackStart()` builds the SSR app + file-based router; `nitro()` is the
// deploy layer that wraps the server output for the host. On Vercel it emits the
// Build Output API (`.vercel/output`) automatically (set NITRO_PRESET=vercel to
// reproduce that output locally); locally it defaults to a node-server build.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    nitro(),
  ],
});
