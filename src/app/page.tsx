import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { tuconApi } from "@/lib/api";
import { cookies, headers } from "next/headers";
import { getRouteFromUserLastView } from "@/lib/utils";
import { RedirectType, redirect } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // if (!cookies().has("__session")) {
  //   return <Home />;
  // }

  // const data = await tuconApi.me({ headers: headers() });
  //
  // const redirectRoute = data.lastView
  //   ? getRouteFromUserLastView(data.lastView)
  //   : null;
  //
  // if (redirectRoute) {
  //   redirect(redirectRoute, RedirectType.replace);
  // }

  return <Home />;
}

function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full px-6 pt-12 md:px-16 md:pt-24 lg:px-24 lg:pt-32">
          <div className="container px-0">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="flex flex-col justify-center space-y-2">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Find the perfect tutor
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Personalized learning at your fingertips. Get matched with a
                    tutor today.
                  </p>
                </div>
                <div className="min:[400px]:flex-row flex flex-col gap-2">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">Find a tutor</Link>
                  </Button>
                </div>
              </div>
              <div className="ml-auto flex items-center">
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
        <section>
          <div className="mt-[150px] flex bg-gray-100">
            <Image
              alt="University of Guelph"
              className="m-8 max-w-[200px] opacity-65"
              src="/guelph_logo.png"
              priority
              height="100"
              width="550"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
