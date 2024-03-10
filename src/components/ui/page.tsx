import * as React from "react";

import { cn } from "@/lib/utils";

const Page = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto px-0 sm:px-6 py-2 w-full flex-1 max-w-none sm:max-w-7xl",
      className,
    )}
    {...props}
  />
));
Page.displayName = "Page";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 py-6 px-6 sm:px-0", className)}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-3xl font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PageDescription.displayName = "PageDescription";

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 sm:px-0", className)} {...props} />
));
PageContent.displayName = "PageContent";

export { Page, PageHeader, PageTitle, PageDescription, PageContent };
