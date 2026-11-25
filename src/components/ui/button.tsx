import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65B32E] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#003C14] via-[#16852C] to-[#65B32E] hover:from-[#002d0f] hover:via-[#127025] hover:to-[#579d26] text-white shadow-md shadow-[#003C14]/25 hover:shadow-lg hover:shadow-[#16852C]/30",
        emerald:
          "bg-[#004614] hover:bg-[#16852C] text-white shadow-sm hover:shadow-md",
        leaf:
          "bg-[#65B32E] hover:bg-[#529424] text-white shadow-md shadow-[#65B32E]/30",
        black:
          "bg-[#000000] hover:bg-[#111827] text-white border border-emerald-900/40 shadow-sm",
        outline:
          "border-2 border-[#004614] bg-white text-[#004614] hover:bg-emerald-50 hover:border-[#16852C]",
        secondary:
          "bg-emerald-50 text-[#004614] hover:bg-emerald-100/80 font-bold",
        ghost:
          "hover:bg-emerald-50 text-stone-800 hover:text-[#004614]",
        link:
          "text-[#004614] underline-offset-4 hover:underline hover:text-[#65B32E] p-0 h-auto",
        glass:
          "bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base font-bold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

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
