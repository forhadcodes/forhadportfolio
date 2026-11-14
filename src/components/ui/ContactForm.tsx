"use client";

import { useState, type FormEvent } from "react";
import { LuLoaderCircle, LuSend } from "react-icons/lu";
import { toast } from "sonner";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
}

const inputClass = (invalid: boolean) =>
  cn(
    "mt-2 w-full rounded-xl border bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors",
    invalid ? "border-red-500" : "border-border hover:border-primary/60",
  );

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(data.get("website") ?? "") }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");

      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Couldn't send your message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      {/* Honeypot: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass(Boolean(errors.name))}
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(Boolean(errors.email))}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project or role..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(Boolean(errors.message)), "resize-y")}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={sending} className={buttonStyles("primary", "md", "w-full sm:w-auto")}>
        {sending ? (
          <>
            <LuLoaderCircle className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <LuSend className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
