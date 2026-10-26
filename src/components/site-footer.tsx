import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { OPENING_HOURS } from "@/data/hours";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/site-header";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Full Menu", to: "/menu" },
  { label: "Our Story", to: "/about" },
  { label: "Reservations", to: "/reservations" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div className="space-y-4">
          <Wordmark className="text-primary-foreground" />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            A fictional Nairobi restaurant concept — thoughtfully prepared dishes,
            vibrant flavors, and a dining experience made for sharing.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="space-y-3">
          <h2 className="eyebrow text-primary-foreground/60">Explore</h2>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-primary-foreground/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="eyebrow text-primary-foreground/60">Visit Us</h2>
          <address className="space-y-2 text-sm not-italic text-primary-foreground/85">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
              <span>
                {site.location.addressLine}, {site.location.area}
                <br />
                {site.location.city}, {site.location.country}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-terracotta" aria-hidden />
              {site.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-terracotta" aria-hidden />
              {site.email}
            </p>
          </address>
          <p className="text-xs text-primary-foreground/60">
            Phone and email are demo information.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="eyebrow text-primary-foreground/60">Opening Hours</h2>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            {OPENING_HOURS.map((row) => (
              <li key={row.days} className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
                <span>
                  <span className="font-semibold">{row.days}</span>
                  <br />
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Portfolio project — {site.demoNotice.toLowerCase()}</p>
          <p>Photos are illustrative, AI-generated for this demo.</p>
        </div>
      </div>
    </footer>
  );
}
