import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link className="text-xl font-semibold tracking-tight" href="/">
          Remote Work Hub
        </Link>
        <nav className="flex items-center gap-3">
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/jobs">
            Jobs
          </Link>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/admin">
            Trust & Admin
          </Link>
          <Link href="/post-job">
            <Button size="sm">Post a Job</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
