import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Image
          alt="Tucon Logo"
          src="/tucon-horizontal.svg"
          height={0}
          width={0}
          className="w-36 h-10"
          priority
        />
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
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="flex flex-col justify-center space-y-2">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Find the perfect tutor
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Personalized learning at your fingertips. Get matched with a
                    tutor today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min:[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">View tutors</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Hero"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center w-auto h-auto"
                  height="310"
                  src="/landing-unsplash-h6gCRTCxM7o.jpg"
                  priority
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Tucon. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
