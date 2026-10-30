import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import heroDining from "@/assets/hero-dining.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import dishTilapia from "@/assets/dish-tilapia.jpg";
import { Button, buttonVariants } from "@/components/ui/button";
import { DishCard } from "@/components/dish-card";
import { DemoNotice } from "@/components/demo-notice";
import { LocationCard } from "@/components/location-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { MENU_ITEMS, MENU_CATEGORIES, SIGNATURE_ITEMS } from "@/data/menu";
import { OPENING_HOURS } from "@/data/hours";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = SIGNATURE_ITEMS.slice(0, 4);

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroDining}
          alt="The warmly lit Saffron & Stone dining room with wooden tables and woven pendant lights at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/80 via-charcoal/55 to-charcoal/75" />

        <div className="container-site flex flex-col items-start gap-6 py-28 md:py-40">
          <p className="eyebrow flex items-center gap-2 text-terracotta">
            <Sparkles className="size-3.5" aria-hidden />
            Contemporary African dining — Kilimani, Nairobi
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight text-primary-foreground sm:text-6xl md:text-7xl">
            Where fire, spice and story share the table
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            {site.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link to="/reservations" className={buttonVariants({ variant: "terracotta", size: "lg" })}>
              Reserve a Table
            </Link>
            <Link to="/menu" search={{ category: "All" }} className={buttonVariants({ variant: "onDark", size: "lg" })}>
              Explore the Menu
              <ArrowRight aria-hidden />
            </Link>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/75">
            <Clock className="size-4 text-terracotta" aria-hidden />
            {OPENING_HOURS[0]!.days} {OPENING_HOURS[0]!.hours} · {site.location.addressLine}, {site.location.area}
          </p>
        </div>
      </section>

      {/* ============ Story teaser ============ */}
      <section className="py-20 md:py-28">
        <div className="container-site grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-3xl shadow-warm">
            <img
              src={aboutInterior}
              alt="Sunlit dining room corner with green walls, rattan chairs and fresh flowers"
              loading="lazy"
              decoding="async"
              width={1408}
              height={1008}
              className="img-cover aspect-[4/3] transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <div className="space-y-5">
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Rooted in the East African coast, cooked for Nairobi"
              copy="Saffron & Stone brings together Swahili coastal cooking, charcoal-grilled classics and a modern Nairobi pantry — one kitchen, many voices. Every plate is built for sharing, from breakfast flat whites to slow evening grills."
            />
            <Link to="/about" className={buttonVariants({ variant: "outline" })}>
              Read our story
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Signature dishes ============ */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading
            eyebrow="House Favourites"
            title="The dishes people come back for"
            copy="A short list of what we do best — grilled over coals, simmered slowly, plated generously."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <DishCard key={item.name} item={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/menu" search={{ category: "All" }} className={buttonVariants({ variant: "primary" })}>
              See the full menu
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Menu preview ============ */}
      <section className="py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading
            eyebrow="From the Kitchen"
            title="Seven ways to eat with us"
            copy="Breakfast through to evening juices — pick a mood and we'll do the rest."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_CATEGORIES.map((category) => {
              const count = MENU_ITEMS.filter((i) => i.category === category).length;
              return (
                <Link
                  key={category}
                  to="/menu"
                  search={{ category }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span>
                    <span className="font-display text-xl leading-snug">{category}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {count} {count === 1 ? "dish" : "dishes"}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-terracotta transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Visit us ============ */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-site space-y-10">
          <SectionHeading eyebrow="Visit Us" title="Find us in Kilimani" />
          <LocationCard />
        </div>
      </section>

      {/* ============ Reservation band ============ */}
      <section className="bg-forest py-20 text-primary-foreground md:py-24">
        <div className="container-site space-y-8 text-center">
          <SectionHeading
            tone="onDark"
            eyebrow="Reservations"
            title="Save your seat by the fire"
            copy="Tables for two to twelve. Friday nights fill quickly — reserve early for grill evenings."
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/reservations" className={buttonVariants({ variant: "solidLight", size: "lg" })}>
              Book a Table Online
            </Link>
            <WhatsAppCta variant="onDark" size="lg" label="Enquire on WhatsApp" />
          </div>
          <DemoNotice className="mx-auto max-w-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground/75">
            {site.demoNotice}
          </DemoNotice>
        </div>
      </section>

      {/* ============ Dish strip ============ */}
      <section className="py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Straight from the Pass"
            title="Tonight's grill special"
            copy="The whole grilled tilapia is the dish we'd order first — charred lemon, herb butter, market vegetables."
          />
          <div className="mt-10 overflow-hidden rounded-3xl shadow-warm">
            <img
              src={dishTilapia}
              alt="Whole grilled tilapia with charred lemon and roasted vegetables on a ceramic platter"
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="img-cover aspect-[21/9]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
