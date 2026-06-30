import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        available: "border-green-200 bg-green-100 text-green-800",
        selling_fast: "border-amber-200 bg-amber-100 text-amber-800",
        sold_out: "border-red-200 bg-red-100 text-red-800",
        coming_soon: "border-blue-200 bg-blue-100 text-blue-800",
        pending: "border-yellow-200 bg-yellow-100 text-yellow-800",
        approved: "border-green-200 bg-green-100 text-green-800",
        rejected: "border-red-200 bg-red-100 text-red-800",
        under_review: "border-blue-200 bg-blue-100 text-blue-800",
        waitlisted: "border-purple-200 bg-purple-100 text-purple-800",
        confirmed: "border-blue-200 bg-blue-100 text-blue-800",
        completed: "border-green-200 bg-green-100 text-green-800",
        cancelled: "border-red-200 bg-red-100 text-red-800",
        navy: "border-transparent bg-[#1e3a5f] text-white",
        green: "border-transparent bg-[#166534] text-white",
        gold: "border-transparent bg-amber-600 text-white",
        outline: "border-border bg-transparent text-foreground",
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
