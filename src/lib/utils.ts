import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { format, isSameDay } from "date-fns";

export function getSiteUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return `https://tucon.ca`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showErrorToast(error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  }
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

export function formatRelativeDate(dateString: string) {
  const today = new Date();
  const date = new Date(dateString);

  // Return the formatted time if the date is today
  if (isSameDay(today, date)) {
    // Format as '1:00 PM' ('p' = long localized time)
    return format(date, "p");
  }

  // Format as '3/31/2024 1:00 PM' ('P' = long localized date)
  return format(date, "P p");
}

export function formatDate(date: string) {
  return format(date, "PPpp");
}

// source: https://gist.github.com/bennettdams/463c804fcfde0eaa888eaa4851c668a1
const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalString<T extends z.ZodString>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export function getRouteFromUserLastView(lastView: string) {
  if (lastView === "onboarding") {
    return "/create-profile";
  }

  if (lastView === "student-home") {
    return "/matching";
  }

  if (lastView === "tutor-home") {
    return "/chat";
  }

  return null;
}
