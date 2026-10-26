import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Clearly identifies demo/sample content where honesty is required. */
export function DemoNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
