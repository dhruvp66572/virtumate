import * as React from "react"
//import { cn } from "../../lib/utils"

const buttonVariants = {
  default: "bg-white text-gray-900 hover:bg-gray-100 transition-colors",
  outline: "border border-white text-white hover:bg-white/10",
}

const sizeVariants = {
  default: "px-4 py-2",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-6 py-3 text-lg"
}

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default",
  children,
  ...props 
}, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }