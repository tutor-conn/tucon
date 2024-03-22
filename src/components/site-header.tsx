import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center justify-between pt-4 px-6 md:px-16 lg:px-24">
      <Link href="/">
        <Image
          alt="Tucon Logo"
          src="/tucon-horizontal.svg"
          height={0}
          width={0}
          className="h-10 w-36"
          priority
        />
      </Link>
      <span className="sr-only">Tucon</span>
      <nav>
        <ul className="flex ml-auto gap-2">
          <li>
            <Button asChild variant="ghost" size="sm">
              <Link href="/about">About</Link>
            </Button>
          </li>
          <li className="relative">
            <span className="absolute inset-y-0 left-0 w-0.5 bg-gray-300" aria-hidden="true"></span>
            <Button className="ml-2" asChild variant="ghost" size="sm">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
