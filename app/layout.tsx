import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Remote Work Hub",
  description: "Find remote jobs easier, faster, and safer.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
