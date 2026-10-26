import { Leaf } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { formatKsh } from "@/lib/site";
import { cn } from "@/lib/utils";

interface DishCardProps {
  item: MenuItem;
  className?: string;
  featured?: boolean;
}

export function DishCard({ item, className, featured = false }: DishCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "md:col-span-2 md:row-span-2",
        className,
      )}
    >
      {item.image ? (
        <div className={cn("overflow-hidden", featured ? "aspect-[4/3] md:aspect-auto md:flex-1" : "aspect-[4/3]")}>
          <img
            src={item.image}
            alt={item.imageAlt ?? `${item.name} — ${item.description}`}
            loading="lazy"
            decoding="async"
            width={1024}
            height={768}
            className="img-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-end bg-secondary p-5",
            featured ? "aspect-[4/3]" : "aspect-[16/9]",
          )}
        >
          <span className="eyebrow text-muted-foreground">{item.category}</span>
        </div>
      )}

      <div className={cn("flex flex-1 flex-col gap-2 p-5", featured && "p-6")}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn("font-display leading-snug", featured ? "text-2xl" : "text-lg")}>
            {item.name}
          </h3>
          <span
            className="shrink-0 rounded-full bg-forest/10 px-3 py-1 text-sm font-bold text-forest"
            aria-label={`Price ${formatKsh(item.price)}`}
          >
            {formatKsh(item.price)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
            {item.category}
          </span>
          {item.dietary ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-olive/20 px-2.5 py-0.5 text-xs font-semibold text-forest">
              <Leaf className="size-3" aria-hidden />
              {item.dietary}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
