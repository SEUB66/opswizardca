import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Standard page chrome: fixed navbar, content, footer — over the global hex bg. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
