import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Our Story", to: "/about" },
  { label: "Reservations", to: "/reservations" },
  { label: "Contact", to: "/contact" },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-xl leading-none tracking-tight", className)}>
      Saffron <span className="text-terracotta">&amp;</span> Stone
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever navigation happens.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-border shadow-warm" : "border-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" aria-label="Saffron & Stone — home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-forest bg-forest/10" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/reservations"
            className={cn(buttonVariants({ variant: "primary", size: "md" }), "hidden sm:inline-flex")}
          >
            Reserve a Table
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-forest bg-forest/10" }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/reservations" className="mt-2 sm:hidden">
            <Button variant="primary" size="lg" className="w-full">
              Reserve a Table
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
