import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

const anchorVariants = cva("underline-offset-4 hover:underline", {
  variants: {
    variant: {
      default: "underline",
      "no-underline": "",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AnchorProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof anchorVariants> {}

export function Anchor(props: AnchorProps) {
  const { className, variant, ...rest } = props;

  return (
    <Link className={cn(anchorVariants({ variant, className }))} {...rest} />
  );
}
