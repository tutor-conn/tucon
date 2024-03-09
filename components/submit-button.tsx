"use client";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={pending} />;
}
