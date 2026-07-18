import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-electric-500 text-white shadow-glow hover:bg-electric-600 hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] active:scale-[0.98]",
        cyan:
          "bg-cyan-500 text-night-900 shadow-glow-cyan hover:bg-cyan-400 active:scale-[0.98]",
        outline:
          "border border-slate-900/15 text-night-900 bg-slate-900/[0.02] hover:bg-slate-900/[0.06] hover:border-slate-900/30 active:scale-[0.98] dark:border-white/15 dark:text-white dark:bg-white/[0.02] dark:hover:bg-white/[0.08] dark:hover:border-white/30",
        ghost: "text-night-900/80 hover:text-night-900 hover:bg-slate-900/[0.06] dark:text-white/80 dark:hover:text-white dark:hover:bg-white/[0.06]",
        link: "text-electric-400 underline-offset-4 hover:underline p-0",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
