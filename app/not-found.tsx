import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Job not found</h1>
      <p className="text-muted-foreground">This listing may have been removed or is no longer available.</p>
      <Link href="/jobs">
        <Button>Back to jobs</Button>
      </Link>
    </div>
  );
}
