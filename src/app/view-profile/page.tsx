"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Page, PageHeader, PageTitle } from "@/components/ui/page";
import { AvatarEdit } from "@/components/avatar-edit";

export default function ViewProfile() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100">
      <SiteHeader />
      <Page>
        <PageHeader>
          <PageTitle>View Profile</PageTitle>
        </PageHeader>
        <main className="p-100 grid items-start gap-6 md:grid-cols-[1fr_300px]">
          <Card className="mx-36 my-4 p-8">
            <CardHeader>
              <CardTitle className="text-center text-4xl">
                Eric&apos;s Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Avatar className="m-auto h-52 w-52">
                <AvatarImage src="/eric.jpg" />
                <AvatarFallback />
              </Avatar>
              <div className="flex flex-col space-y-6 pt-6">
                <div>
                  <h1 className="mb-2 text-3xl">Gender</h1>
                  <p className="text-2xl">Male</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">Pay Rate/hr</h1>
                  <p className="text-2xl">$25</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">City</h1>
                  <p className="text-2xl">Guelph, ON</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">Courses</h1>
                  <div className="flex space-x-4 text-xl">
                    <p className="rounded bg-gradient-to-r from-violet-200 to-pink-200 p-2">
                      CIS*3750
                    </p>
                    <p className="rounded bg-gradient-to-r from-blue-200 to-cyan-200 p-2">
                      CIS*3700
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">About Me</h1>
                  <p className="rounded bg-muted p-8 text-2xl">
                    Hi, my name is Eric and I like playing Clash Royale.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex">
              {/* <Button>Save</Button> */}
            </CardFooter>
          </Card>
        </main>
      </Page>
      <SiteFooter />
    </div>
  );
}
