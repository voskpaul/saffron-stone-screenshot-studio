import { MapPin, MessageCircle, Navigation } from "lucide-react";
import { OPENING_HOURS, KITCHEN_NOTE } from "@/data/hours";
import { site, whatsappHref, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/whatsapp-cta";

const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Kilimani%2C%20Nairobi%2C%20Kenya";

export function LocationCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-display text-xl">The Address</h3>
          <address className="flex items-start gap-3 text-sm not-italic leading-relaxed text-muted-foreground">
            <MapPin className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
            <span>
              <strong className="text-foreground">
                {site.location.addressLine}, {site.location.area}
              </strong>
              <br />
              {site.location.city}, {site.location.country}
              <br />
              <span className="text-xs">{site.location.note}</span>
            </span>
          </address>
          <div className="flex flex-wrap gap-3">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              <Navigation aria-hidden />
              Get Directions
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <MessageCircle aria-hidden />
              Call {site.phone}
            </a>
          </div>
          <p className="text-xs text-muted-foreground">Phone is demo information, not a real line.</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-xl">Opening Hours</h3>
          <dl className="space-y-2 text-sm">
            {OPENING_HOURS.map((row) => (
              <div
                key={row.days}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-border pb-2"
              >
                <dt className="font-semibold text-foreground">{row.days}</dt>
                <dd className="text-muted-foreground">
                  {row.hours}
                  {row.note ? <span className="block text-xs text-terracotta">{row.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-muted-foreground">{KITCHEN_NOTE}</p>
          <WhatsAppCta size="sm" label="Ask us on WhatsApp" />
        </div>
      </div>
    </div>
  );
}

export const whatsappFallbackHref = () => whatsappHref(DEFAULT_WHATSAPP_MESSAGE);
