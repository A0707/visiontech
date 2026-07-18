import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-electric-500/30 bg-electric-500/10 text-electric-600 dark:text-electric-400",
        cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        muted: "border-slate-900/10 bg-slate-900/[0.04] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        danger: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
        "solid-success": "border-transparent bg-emerald-500 text-white shadow-sm",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
