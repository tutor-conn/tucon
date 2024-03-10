import { Anchor } from "./ui/anchor";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Tutor Connect. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-xs">
        <Anchor variant="no-underline" href="/legal/terms-of-service">
          Terms of Service
        </Anchor>
        <Anchor variant="no-underline" href="/legal/privacy-policy">
          Privacy
        </Anchor>
      </nav>
    </footer>
  );
}
