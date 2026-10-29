import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf, Users } from "lucide-react";
import aboutInterior from "@/assets/about-interior.jpg";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { LocationCard } from "@/components/location-card";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Our Story — Saffron & Stone" },
      {
        name: "description",
        content:
          "How Saffron & Stone came to be — a fictional Nairobi restaurant concept rooted in Swahili coastal cooking, charcoal grills and modern African hospitality.",
      },
      { property: "og:title", content: "Our Story — Saffron & Stone" },
      {
        property: "og:description",
        content:
          "A Nairobi restaurant concept rooted in Swahili coastal cooking, charcoal grills and modern African hospitality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const VALUES = [
  {
    icon: Flame,
    title: "Fire first",
    copy: "Our grill runs from breakfast service to close. Smoke, char and live flame shape most of what leaves the kitchen.",
  },
  {
    icon: Leaf,
    title: "Market-led",
    copy: "We buy from the same vendors at the same markets each week, and the menu bends with the seasons — never the other way round.",
  },
  {
    icon: Users,
    title: "Made for sharing",
    copy: "Platters over plates, the middle of the table over place settings. Bring people; we'll bring the rest.",
  },
] as const;

function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-5">
            <p className="eyebrow text-terracotta">Our Story</p>
            <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              A dining room built on the idea of the shared table
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Saffron & Stone began as a Sunday idea: take the coastal food we grew up
              eating — pilau, coconut curries, grilled fish fresh off the coals — and
              give it a room worthy of the occasion. Warm light, dark green walls, wood
              everywhere you look.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              The name is honest: saffron for the spice routes that shaped the Swahili
              coast, stone for the charcoal hearth that anchors our kitchen. Between the
              two sits everything we cook.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-warm">
            <img
              src={aboutInterior}
              alt="Sunlit corner of the Saffron & Stone dining room with green walls, rattan chairs and fresh flowers"
              loading="lazy"
              decoding="async"
              width={1408}
              height={1008}
              className="img-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading
            eyebrow="What We Believe"
            title="Three rules the kitchen lives by"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-forest/10">
                  <Icon className="size-6 text-forest" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading
            eyebrow="Group Visits"
            title="The whole room is yours to book"
            copy="We host birthdays, team dinners, launches and long-table family lunches for groups of twelve to forty. Set menus are built around your guests — grill-forward, coastal or fully vegetarian."
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl">Group enquiries</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tell us the date, the headcount and the mood — we'll reply with two or
                three set-menu options within a day.
              </p>
              <Link
                to="/contact"
                search={{ type: "Group events" }}
                className={buttonVariants({ variant: "primary", size: "md" }) + " mt-6"}
              >
                Enquire about a group
                <ArrowRight aria-hidden />
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl">Friday grill nights</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every Friday from 7 PM the outdoor coals come out — nyama choma, live
                music and a shortened à la carte menu. Reserve ahead; these evenings
                book out.
              </p>
              <Link to="/reservations" className={buttonVariants({ variant: "terracotta", size: "md" }) + " mt-6"}>
                Reserve a Friday table
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading eyebrow="Visit Us" title="Come and see the room" />
          <LocationCard />
        </div>
      </section>
    </>
  );
}
