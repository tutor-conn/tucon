import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  let formattedPhone = digitsOnly;

  if (digitsOnly.length > 3) {
    formattedPhone = `(${formattedPhone.substring(0, 3)}) ${formattedPhone.substring(3)}`;
  }
  if (digitsOnly.length > 6) {
    formattedPhone = `${formattedPhone.substring(0, 9)} - ${formattedPhone.substring(9)}`;
  }

  return formattedPhone;
}

// source: https://gist.github.com/bennettdams/463c804fcfde0eaa888eaa4851c668a1
const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalString<T extends z.ZodString>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
