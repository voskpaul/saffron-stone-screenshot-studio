import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/demo-notice";
import { LocationCard } from "@/components/location-card";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = ["General", "Group events", "Feedback", "Careers", "Press"] as const;
type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search.type === "string" ? search.type : "";
    return { type: (ENQUIRY_TYPES as readonly string[]).includes(raw) ? raw : "" } as { type: string };
  },
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Saffron & Stone" },
      {
        name: "description",
        content:
          "Contact Saffron & Stone in Kilimani, Nairobi — general enquiries, group events, feedback, careers and press. Reach us by form, phone, email or WhatsApp.",
      },
      { property: "og:title", content: "Contact — Saffron & Stone" },
      {
        property: "og:description",
        content:
          "General enquiries, group events, feedback, careers and press — reach Saffron & Stone by form, phone, email or WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const contactSchema = {
  name: (v: string) => (v.trim().length >= 2 && v.trim().length <= 80 ? "" : "Please enter your name."),
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.trim().length <= 120
      ? ""
      : "Please enter a valid email address.",
  message: (v: string) =>
    v.trim().length >= 10 && v.trim().length <= 1000
      ? ""
      : "Please write at least 10 characters (max 1000).",
};

function ContactPage() {
  const { type } = Route.useSearch();
  const navigate = Route.useNavigate();
  const initialType = ((ENQUIRY_TYPES as readonly string[]).includes(type) ? type : "General") as EnquiryType;

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const setType = (next: EnquiryType) => {
    setEnquiryType(next);
    navigate({ search: { type: next }, replace: true });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {
      name: contactSchema.name(name),
      email: contactSchema.email(email),
      message: contactSchema.message(message),
    };
    setErrors(Object.fromEntries(Object.entries(next).filter(([, v]) => v)));
    if (Object.values(next).every((v) => !v)) {
      // Demo project: nothing is sent — show a confirmation instead.
      setSent(true);
    }
  };

  if (sent) {
    return (
      <section className="container-site py-20 md:py-28">
        <div className="mx-auto max-w-xl space-y-5 rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto size-12 text-forest" aria-hidden />
          <h1 className="font-display text-3xl">Message noted</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thanks {name.split(" ")[0]} — your {enquiryType.toLowerCase()} enquiry has been
            noted. This demo doesn't send email, so nothing left your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
            >
              Write another
            </Button>
            <WhatsAppCta label="Follow up on WhatsApp" size="md" />
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest";
  const fieldError = "text-xs font-semibold text-destructive";

  return (
    <>
      <section className="bg-forest py-16 text-primary-foreground md:py-20">
        <div className="container-site space-y-4 text-center">
          <p className="eyebrow text-terracotta">Contact</p>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Say hello</h1>
          <p className="mx-auto max-w-2xl text-primary-foreground/80">
            Questions, feedback, big-table plans — it all reaches the same friendly
            inbox. Pick a topic below so it lands with the right person.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8" aria-label="Contact form">
            <div className="flex items-center gap-3">
              <Send className="size-5 text-terracotta" aria-hidden />
              <h2 className="font-display text-2xl">Send a message</h2>
            </div>

            <div>
              <p className="text-sm font-semibold" id="enquiry-type-label">
                What's this about?
              </p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="enquiry-type-label">
                {ENQUIRY_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={enquiryType === t}
                    onClick={() => setType(t)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      enquiryType === t
                        ? "border-forest bg-forest text-primary-foreground"
                        : "border-border bg-transparent text-foreground/80 hover:border-forest/50",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="c-name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  maxLength={80}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  aria-invalid={!!errors.name}
                />
                {errors.name ? <p className={fieldError}>{errors.name.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="c-email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  maxLength={120}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  aria-invalid={!!errors.email}
                />
                {errors.email ? <p className={fieldError}>{errors.email.message}</p> : null}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="c-message" className="text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={6}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest"
                  aria-invalid={!!errors.message}
                  placeholder={enquiryType === "Group events" ? "Tell us the date, headcount and occasion…" : "How can we help?"}
                />
                {errors.message ? <p className={fieldError}>{errors.message.message}</p> : null}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send message
            </Button>
            <DemoNotice>
              Portfolio demo — messages aren't sent or stored. Use {site.phone} or the
              WhatsApp button for anything real.
            </DemoNotice>
          </form>

          <aside className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl">Direct lines</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-terracotta" aria-hidden />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold underline-offset-4 hover:underline">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-terracotta" aria-hidden />
                  <span className="font-semibold">{site.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-4 shrink-0 text-terracotta" aria-hidden />
                  <WhatsAppCta size="sm" label="WhatsApp us" variant="ghost" />
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">
                Phone and email are demo details, not real lines.
              </p>
            </div>
            <div className="rounded-3xl bg-cream p-8">
              <h2 className="font-display text-2xl">Planning something big?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Groups of twelve to forty get set menus and a dedicated host. Start with
                a group enquiry and we'll build the evening around you.
              </p>
              <Link
                to="/contact"
                search={{ type: "Group events" }}
                className="mt-4 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
              >
                Group enquiry
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <LocationCard />
        </div>
      </section>
    </>
  );
}
