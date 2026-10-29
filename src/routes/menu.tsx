import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchX, Search } from "lucide-react";
import { DishCard } from "@/components/dish-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategory } from "@/data/menu";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | MenuCategory;
type DietaryFilter = "All" | "Vegetarian" | "Vegan" | "Gluten-free option";

const DIETARY_FILTERS: DietaryFilter[] = ["All", "Vegetarian", "Vegan", "Gluten-free option"];

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : "All",
  }),
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — Saffron & Stone" },
      {
        name: "description",
        content:
          "Browse the full Saffron & Stone menu — breakfast, charcoal-grilled mains, vegetarian plates, desserts and fresh Kenyan juices. Search and filter by category.",
      },
      { property: "og:title", content: "Menu — Saffron & Stone" },
      {
        property: "og:description",
        content:
          "Breakfast, charcoal-grilled mains, vegetarian plates, desserts and fresh juices — browse and filter the full menu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function MenuPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const [dietary, setDietary] = useState<DietaryFilter>("All");

  const activeCategory: CategoryFilter =
    (MENU_CATEGORIES as readonly string[]).includes(category) ? (category as MenuCategory) : "All";

  const setCategory = (next: CategoryFilter) =>
    navigate({ search: { category: next } });

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (dietary !== "All" && item.dietary !== dietary) return false;
      if (q && !`${item.name} ${item.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, activeCategory, dietary]);

  const filtersActive = activeCategory !== "All" || dietary !== "All" || query.trim() !== "";

  const reset = () => {
    setQuery("");
    setDietary("All");
    setCategory("All");
  };

  return (
    <>
      <section className="bg-forest py-16 text-primary-foreground md:py-20">
        <div className="container-site space-y-4 text-center">
          <p className="eyebrow text-terracotta">The Menu</p>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            Cooked over coals, simmered with patience
          </h1>
          <p className="mx-auto max-w-2xl text-primary-foreground/80">
            Every dish below is served in our Kilimani dining room. Prices are in Kenyan
            shillings and are sample figures for this portfolio project.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              maxLength={80}
              className="h-11 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-forest"
            />
          </div>

          {/* Category pills */}
          <div>
            <h2 className="sr-only">Filter by category</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Menu categories">
              {(["All", ...MENU_CATEGORIES] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    activeCategory === cat
                      ? "border-forest bg-forest text-primary-foreground"
                      : "border-border bg-card text-foreground/80 hover:border-forest/50 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary pills */}
          <div>
            <h2 className="sr-only">Filter by dietary preference</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Dietary preferences">
              {DIETARY_FILTERS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={dietary === d}
                  onClick={() => setDietary(d)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    dietary === d
                      ? "border-olive bg-olive/25 text-forest"
                      : "border-border bg-card text-muted-foreground hover:border-olive/60 hover:text-foreground",
                  )}
                >
                  {d === "All" ? "All diets" : d}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground" role="status">
            Showing {items.length} {items.length === 1 ? "dish" : "dishes"}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            {dietary !== "All" ? ` · ${dietary}` : ""}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <DishCard key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
            <SearchX className="size-10 text-terracotta" aria-hidden />
            <SectionHeading
              title="No dishes match that search"
              copy="Try a shorter word — or clear the filters to see the whole menu."
            />
            {filtersActive ? (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-forest/30 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-forest hover:bg-forest/5"
              >
                Clear all filters
              </button>
            ) : null}
          </div>
        )}

        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-secondary p-10 text-center">
          <p className="font-display text-2xl">Can't decide? Ask us.</p>
          <WhatsAppCta size="md" label="Get a recommendation on WhatsApp" />
        </div>
      </section>
    </>
  );
}
