import { Anchor } from "./ui/anchor";

export function SiteFooter() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Tutor Connect. All rights reserved.
      </p>
      <nav className="flex gap-4 text-xs sm:ml-auto sm:gap-6">
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
