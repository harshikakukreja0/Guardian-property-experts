import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[#003C14] to-[#16852C] text-white shadow-xs",
        secondary:
          "border-transparent bg-emerald-50 text-[#004614]",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground border-stone-200",
        verified:
          "border-emerald-500/40 bg-emerald-50 text-[#004614] font-extrabold",
        leaf:
          "border-[#65B32E]/30 bg-[#65B32E]/10 text-[#004614] font-bold",
        black:
          "border-stone-800 bg-[#000000] text-white",
        luxury:
          "border-white/20 bg-stone-950/80 text-white backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
