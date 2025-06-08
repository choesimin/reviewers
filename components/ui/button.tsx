import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-primary-foreground shadow hover:bg-primary/90 border border-primary': variant === 'default',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary': variant === 'secondary',
        'border border-primary bg-background hover:bg-primary hover:text-primary-foreground': variant === 'outline',
        'hover:bg-muted hover:text-foreground': variant === 'ghost',
      },
      {
        'h-9 px-4 py-2': size === 'default',
        'h-8 rounded-md px-3 text-xs': size === 'sm',
        'h-10 rounded-md px-8': size === 'lg',
      },
      className
    )

    // For asChild, we'll just render the children with the className applied
    if (asChild && children) {
      return (
        <div className={baseClasses}>
          {children}
        </div>
      )
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
