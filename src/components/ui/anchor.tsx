import { cn } from "@/lib/utils";
import Link from "next/link";

export function Anchor(props: React.ComponentProps<typeof Link>) {
  const { className, ...rest } = props;

  return (
    <Link
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...rest}
    />
  );
}
