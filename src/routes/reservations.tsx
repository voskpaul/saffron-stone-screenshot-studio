import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/demo-notice";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";

export const Route = createFileRoute("/reservations")({
  component: ReservationsPage,
  head: () => ({
    meta: [
      { title: "Reservations — Saffron & Stone" },
      {
        name: "description",
        content:
          "Reserve a table at Saffron & Stone, Kilimani, Nairobi. Tables for two to twelve, lunch and dinner, with WhatsApp enquiries for larger groups.",
      },
      { property: "og:title", content: "Reservations — Saffron & Stone" },
      {
        property: "og:description",
        content:
          "Reserve a table for two to twelve at Saffron & Stone, Kilimani, Nairobi — or enquire on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reservations" }],
  }),
});

const MAX_PARTY = 12;
const ADVANCE_DAYS = 90;

const reservationSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(80),
    email: z.string().trim().email("Please enter a valid email address.").max(120),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s-]{6,19}$/, "Please enter a valid phone number."),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
      .refine((value) => {
        const chosen = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return chosen.getTime() >= today.getTime();
      }, "Reservations can't be in the past.")
      .refine((value) => {
        const chosen = new Date(`${value}T00:00:00`);
        const max = new Date();
        max.setDate(max.getDate() + ADVANCE_DAYS);
        max.setHours(23, 59, 59, 999);
        return chosen.getTime() <= max.getTime();
      }, `We take bookings up to ${ADVANCE_DAYS} days ahead.`),
    time: z.string().min(1, "Please choose a time."),
    partySize: z.coerce
      .number({ message: "How many guests?" })
      .int()
      .min(1, "At least one guest, please.")
      .max(MAX_PARTY, `For parties above ${MAX_PARTY}, please send a group enquiry instead.`),
    occasion: z.string().max(60).optional(),
    notes: z.string().trim().max(500, "Please keep notes under 500 characters.").optional(),
  })
  .required();

type ReservationForm = z.infer<typeof reservationSchema>;

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

const OCCASIONS = ["Dinner", "Birthday", "Business lunch", "Anniversary", "Date", "Other"] as const;

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest";

const fieldError = "text-xs font-semibold text-destructive";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function ReservationsPage() {
  const [submitted, setSubmitted] = useState<ReservationForm | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { time: "", occasion: "Dinner", partySize: 2 },
  });

  const onSubmit = (values: ReservationForm) => {
    // Demo project: no backend — show confirmation instead of sending anything.
    setSubmitted(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const waMessage = `Hello ${site.name}! I'd like to confirm a table for ${submitted.partySize} on ${submitted.date} at ${submitted.time} under ${submitted.name}.`;
    return (
      <section className="container-site py-20 md:py-28">
        <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto size-12 text-forest" aria-hidden />
          <h1 className="font-display text-3xl">Request received</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thanks {submitted.name.split(" ")[0]} — a table for <strong>{submitted.partySize}</strong> on{" "}
            <strong>{submitted.date}</strong> at <strong>{submitted.time}</strong> has been noted. This
            demo doesn't send anything, so no real booking was made.
          </p>
          <div className="space-y-3">
            <p className="text-sm font-semibold">To make it real, reach us on WhatsApp:</p>
            <WhatsAppCta message={waMessage} label="Confirm via WhatsApp" />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(null);
              reset();
            }}
          >
            Book another table
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-forest py-16 text-primary-foreground md:py-20">
        <div className="container-site space-y-4 text-center">
          <p className="eyebrow text-terracotta">Reservations</p>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Reserve a table</h1>
          <p className="mx-auto max-w-2xl text-primary-foreground/80">
            Tables for one to {MAX_PARTY} guests, lunch and dinner, six days ahead of the
            kitchen. For parties above {MAX_PARTY}, send us a group enquiry.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
            aria-label="Reservation form"
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="size-5 text-terracotta" aria-hidden />
              <h2 className="font-display text-2xl">Your visit</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="res-name" className="text-sm font-semibold">
                  Full name
                </label>
                <input id="res-name" type="text" maxLength={80} autoComplete="name" {...register("name")} className={inputClass} aria-invalid={!!errors.name} />
                {errors.name ? <p className={fieldError}>{errors.name.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="res-phone" className="text-sm font-semibold">
                  Phone
                </label>
                <input id="res-phone" type="tel" autoComplete="tel" placeholder="+254 7XX XXX XXX" {...register("phone")} className={inputClass} aria-invalid={!!errors.phone} />
                {errors.phone ? <p className={fieldError}>{errors.phone.message}</p> : null}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="res-email" className="text-sm font-semibold">
                  Email
                </label>
                <input id="res-email" type="email" autoComplete="email" {...register("email")} className={inputClass} aria-invalid={!!errors.email} />
                {errors.email ? <p className={fieldError}>{errors.email.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="res-date" className="text-sm font-semibold">
                  Date
                </label>
                <input id="res-date" type="date" min={todayISO()} {...register("date")} className={inputClass} aria-invalid={!!errors.date} />
                {errors.date ? <p className={fieldError}>{errors.date.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="res-time" className="text-sm font-semibold">
                  Time
                </label>
                <select id="res-time" {...register("time")} className={inputClass} aria-invalid={!!errors.time}>
                  <option value="">Choose a time…</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time ? <p className={fieldError}>{errors.time.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="res-party" className="text-sm font-semibold">
                  Guests (1–{MAX_PARTY})
                </label>
                <input
                  id="res-party"
                  type="number"
                  min={1}
                  max={MAX_PARTY}
                  {...register("partySize", { valueAsNumber: true })}
                  className={inputClass}
                  aria-invalid={!!errors.partySize}
                />
                {errors.partySize ? <p className={fieldError}>{errors.partySize.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="res-occasion" className="text-sm font-semibold">
                  Occasion <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <select id="res-occasion" {...register("occasion")} className={inputClass}>
                  {OCCASIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="res-notes" className="text-sm font-semibold">
                  Anything we should know?{" "}
                  <span className="font-normal text-muted-foreground">(allergies, seating, accessibility — optional)</span>
                </label>
                <textarea id="res-notes" rows={4} maxLength={500} {...register("notes")} className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest" />
                {errors.notes ? <p className={fieldError}>{errors.notes.message}</p> : null}
              </div>
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
              Request this table
            </Button>
            <DemoNotice>
              This is a portfolio demo — submitting the form shows a confirmation but
              books nothing. Use WhatsApp or {site.phone} for anything real.
            </DemoNotice>
          </form>

          <aside className="space-y-6">
            <div className="space-y-4 rounded-3xl bg-forest p-8 text-primary-foreground">
              <h2 className="font-display text-2xl">Good to know</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-primary-foreground/85">
                <li>• We hold tables for 15 minutes past booking time.</li>
                <li>• Friday grill nights (from 7 PM) fill fastest — book early.</li>
                <li>• High chairs and step-free seating available; mention it in notes.</li>
                <li>• The kitchen closes 45 minutes before closing time.</li>
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
              <MessageCircle className="size-6 text-terracotta" aria-hidden />
              <h2 className="font-display text-2xl">Prefer WhatsApp?</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Send us your party size and preferred time — we usually reply within the
                hour during service.
              </p>
              <WhatsAppCta label="Enquire on WhatsApp" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
