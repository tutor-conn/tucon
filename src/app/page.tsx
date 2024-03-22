import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 px-6 md:px-16 lg:px-24">
          <div className="container px-0">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="flex flex-col justify-center space-y-2">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Find the perfect tutor
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Personalized learning at your fingertips. Get matched with a tutor today.
                  </p>
                </div>
                <div className="min:[400px]:flex-row flex flex-col gap-2">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">Find a tutor</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center ml-auto">
                <Image
                  alt="Hero"
                  className="aspect-video h-auto w-auto overflow-hidden rounded-xl object-cover object-center"
                  src="/landing-unsplash-h6gCRTCxM7o.jpg"
                  priority
                  height="310"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div className="container">
            <div className="flex flex-col justify-center">
              <Image
                alt="Tucon Logo"
                src="/tucon-vertical.svg"
                height={0}
                width={0}
                className="w-[30%] mx-auto"
                priority
              />
              <h1 className="mx-auto font-bold text-4xl tracking-tighter text-secondary">Our Mission</h1>
              <p className="w-[75%] mx-auto text-center text-xl">
                Our goal is to provide a platform that seamlessly connects University of Guelph students with qualified tutors. 
                We aim to simplify the tutor search process and provide a space where students can easily discover, chat, and engage with tutors.
              </p>
            </div>
          </div>
        </section> */}
      </main>
      <SiteFooter />
    </div>
  );
}
