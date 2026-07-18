import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border bg-slate-900/[0.03] px-4 text-sm text-night-900 placeholder:text-slate-500 outline-none transition-colors focus:border-electric-500 focus:bg-slate-900/[0.05] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate/70 dark:focus:bg-white/[0.05]",
            error ? "border-red-500/60" : "border-slate-900/10 dark:border-white/10",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
