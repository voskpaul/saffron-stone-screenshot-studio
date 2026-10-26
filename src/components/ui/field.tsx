import { cn } from "@/lib/utils";

export const inputCls =
  "h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20";

export const textareaCls =
  "min-h-28 w-full rounded-lg border border-input bg-card px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 aria-[invalid=true]:border-destructive";

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-terracotta" aria-hidden>*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
