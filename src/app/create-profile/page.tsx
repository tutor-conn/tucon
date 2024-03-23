import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page, PageHeader, PageTitle } from "@/components/ui/page";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

// Needed for Server Components to work with Cloudflare Pages
export const runtime = "edge";

export default function SelectProfileType() {
  // if (!cookies().has("__session")) {
  //   redirect("/");
  // }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100">
      <SiteHeader />
      <Page className="max-w-4xl">
        <PageHeader>
          <PageTitle>Create a Profile</PageTitle>
        </PageHeader>
        <main>
          <Card>
            <CardContent className="flex min-h-80 flex-col items-center justify-center gap-6">
              <h1 className="text-3xl font-semibold">
                Are you a Student or a Tutor?
              </h1>

              <div className="flex gap-3">
                <Button asChild size="lg">
                  <Link href="/create-profile/student">Student</Link>
                </Button>

                <Button asChild size="lg">
                  <Link href="/create-profile/tutor">Tutor</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </Page>
    </div>
  );
}
