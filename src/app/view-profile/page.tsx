"use client";
import { Navbar } from "@/components/navbar";
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

export default function ViewProfile() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar message={"isStudent"} />
      <Page>
        <main className="flex-1 flex justify-center">
          <Card className="w-full sm:w-1/2 mx-4 my-6 p-0 sm:p-8 shadow-xl space-y-6">
            <CardHeader className="space-y-8">
              <CardTitle className="text-center text-4xl">
                Tutor Profile
              </CardTitle>
              <Avatar className="m-auto h-52 w-52">
                <AvatarImage src="/default-profile.png" />
                <AvatarFallback />
              </Avatar>
            </CardHeader>
            <CardContent className="columns-1 lg:columns-2">
              <div className="flex flex-col space-y-6">
                <div>
                  <h1 className="mb-2 text-3xl">Gender</h1>
                  <p className="text-2xl">Male</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">Pay Rate/hr</h1>
                  <p className="text-2xl">$25</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">Location</h1>
                  <p className="text-2xl">Guelph, Canada</p>
                </div>
                <div>
                  <h1 className="mb-2 text-3xl">Remote Option?</h1>
                  <p className="text-2xl">Yes</p>
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
                  <h1 className="mb-2 text-3xl">Language</h1>
                  <p className="text-2xl">English</p>
                </div>
                <div>
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
