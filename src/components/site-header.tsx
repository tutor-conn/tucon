import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="/">
        <Image
          alt="Tucon Logo"
          src="/tucon-horizontal.svg"
          height={0}
          width={0}
          className="w-36 h-10"
          priority
        />
      </Link>
      <span className="sr-only">Tucon</span>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="secondary" size="sm">
          <Link href="/sign-up">Sign up</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/login">Log in</Link>
        </Button>
      </nav>
    </header>
  );
}
