import * as React from "react";
import PropTypes from "prop-types";
import { buttonVariants, sizeVariants } from "./buttonVariants";
//import { cn } from "../../lib/utils"

const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outline']),
  size: PropTypes.oneOf(['default', 'sm', 'lg']),
  children: PropTypes.node.isRequired,
};

export { Button };
