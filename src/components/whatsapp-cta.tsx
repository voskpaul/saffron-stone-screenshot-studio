import { MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  site,
  whatsappHref,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface WhatsAppCtaProps {
  message?: string;
  label?: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

/**
 * Reusable WhatsApp enquiry CTA. Opens a pre-filled conversation when a valid
 * number is configured in `src/lib/site.ts`; otherwise renders a clear demo
 * notice instead of a broken link.
 */
export function WhatsAppCta({
  message = DEFAULT_WHATSAPP_MESSAGE,
  label = "Chat with us on WhatsApp",
  className,
  variant = "terracotta",
  size = "md",
}: WhatsAppCtaProps) {
  const href = whatsappHref(message);

  if (!href) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        WhatsApp enquiries are not configured in this demo.
      </p>
    );
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens WhatsApp in a new tab)`}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        <MessageCircle aria-hidden />
        {label}
      </a>
      <p className={cn("text-xs text-muted-foreground", className?.includes("w-full") ? "w-full" : "")}>
        Opens WhatsApp with {site.whatsappNumber} (demo number). No message is sent automatically.
      </p>
    </>
  );
}
