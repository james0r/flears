import { cn } from "~/utils"

export function Container(
  { children,
    className,
    ...props
  }: { children: React.ReactNode, className?: string, [key: string]: any }) {
  return (
    <div className={cn(className, [
      'px-4',
      'sm:px-6',
      'md:px-8',
    ])}>
      <div
        {...props}
        className={cn([
          'container',
          'mx-auto'
        ])}>
        {children}
      </div>
    </div>
  )
}