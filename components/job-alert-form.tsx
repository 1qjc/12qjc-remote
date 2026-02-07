"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JobAlertForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim() || null,
      timezone: String(formData.get("timezone") ?? "").trim() || null,
    };

    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage("Alert saved. You will get updates for new remote roles.");
      event.currentTarget.reset();
    } else {
      setMessage("Could not save alert right now.");
    }

    setLoading(false);
  }

  return (
    <form className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={onSubmit}>
      <Input name="email" placeholder="you@example.com" required type="email" />
      <Input name="role" placeholder="Role (optional)" />
      <Input name="timezone" placeholder="Timezone (optional)" />
      <Button disabled={loading} type="submit">
        {loading ? "Saving..." : "Create Alert"}
      </Button>
      {message && <p className="md:col-span-4 text-sm text-muted-foreground">{message}</p>}
    </form>
  );
}
