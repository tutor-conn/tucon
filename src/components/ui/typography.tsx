import { cn } from "@/lib/utils";

export function TypographyH1(props: React.HTMLProps<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...rest}
    />
  );
}

export function TypographyH2(props: React.HTMLProps<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...rest}
    />
  );
}

export function TypographyH3(props: React.HTMLProps<HTMLHeadingElement>) {
  const { className, ...rest } = props;
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    />
  );
}

export function TypographyP(props: React.HTMLProps<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...rest}
    />
  );
}

export function TypographyLead(props: React.HTMLProps<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...rest} />
  );
}
