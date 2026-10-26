import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "default" | "onDark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const onDark = tone === "onDark";
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", onDark ? "text-terracotta" : "text-terracotta")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight tracking-tight sm:text-4xl",
          onDark && "text-primary-foreground",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p className={cn("text-base leading-relaxed sm:text-lg", onDark ? "text-primary-foreground/75" : "text-muted-foreground")}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
