import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm btn-primary-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        ghost: "hover:bg-primary/8 hover:text-primary text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
        navy: "bg-[#1e3a5f] text-white hover:bg-[#152d4a] shadow-md",
        green: "bg-[#166534] text-white hover:bg-[#14532d] shadow-md",
        gold: "bg-amber-600 text-white hover:bg-amber-700 shadow-md",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-md",
        outline_white: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1e3a5f]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        icon_sm: "h-8 w-8 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
