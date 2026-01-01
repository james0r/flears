import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/utils"

const itemLabelVariants = cva(
  [
    'inline-flex',
    'leading-none',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'uppercase',
    'tracking-widest',
    'after:content-[\"\"]',
    'after:absolute',
    'after:top-full',
    'after:border-solid',
    'after:border-l-transparent',
    'after:border-r-transparent',
    'after:border-b-transparent',
    'pointer-events-none'
  ],
  {
    variants: {
      variant: {
        default: "bg-black text-white after:border-t-black",
        sale: "bg-sale-700 text-white after:border-t-sale",
        hot: "bg-orange-500 text-white after:border-t-orange-500",
        new: "bg-primary text-white after:border-t-primary",
      },
      size: {
        default: "py-[.325rem] px-[.325rem] text-[.75rem] after:border-x-[5px] after:border-y-[7px] after:left-[5px]",
        sm: "p-1 text-[.5rem] after:border-x-[3px] after:border-y-[4px] after:left-[4px]",
        lg: "px-2 py-2 text-[1rem] after:border-x-[8px] after:border-y-[10px] after:left-[6px]",
      },
      position: {
        default: "",
        'top right': "absolute left-full bottom-full -translate-x-[30%] -translate-y-[50%]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "top right",
    },
  }
)

export interface ItemLabelProps extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof itemLabelVariants> { }

const ItemLabel = React.forwardRef<HTMLSpanElement, ItemLabelProps>(
  ({ className, variant, title, size, position, ...props }, ref) => {
    return (
      <span className={cn([
        'relative',
        'inline-block'
      ], className)}>
        {props.children}
        <span
          className={cn(itemLabelVariants({ variant, size, position }))}
          ref={ref}
          {...props}
        >
          {title}
        </span>
      </span>
    )
  }
)
ItemLabel.displayName = "ItemLabel"

export { ItemLabel, itemLabelVariants }
