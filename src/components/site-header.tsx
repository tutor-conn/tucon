"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tuconApi } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { getRouteFromUserLastView } from "@/lib/utils";

export function SiteHeader() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: tuconApi.me,
  });

  const lastViewRoute = data?.lastView
    ? getRouteFromUserLastView(data.lastView)
    : null;

  return (
    <header className="flex h-14 items-center bg-background px-6 md:px-16 lg:px-24">
      <div className="flex flex-1 gap-4">
        <Link href={lastViewRoute ?? "/"}>
          <Image
            src="/tucon-horizontal.svg"
            height={0}
            width={0}
            className="hidden h-10 w-36 sm:block"
            priority
            alt=""
          />
          <Image
            src="/tucon.svg"
            height={0}
            width={0}
            className="block h-10 w-10 sm:hidden"
            priority
            alt=""
          />
          <span className="sr-only">Tucon</span>
        </Link>

        {/* Vertical divider */}
        {/* <span className="border-l-2 border-gray-300" /> */}

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>

      <div className="flex gap-4 sm:gap-6">
        {isLoading && (
          <>
            <Skeleton className="h-9 w-[70px]" />
            <Skeleton className="h-9 w-[70px]" />
          </>
        )}

        {data && data.userId === null && <SignInSignUpButtons />}

        {data && data.userId !== null && <UserButtons userData={data} />}
      </div>
    </header>
  );
}

function SignInSignUpButtons() {
  return (
    <>
      <Button asChild variant="secondary" size="sm">
        <Link href="/sign-up">Sign up</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href="/login">Log in</Link>
      </Button>
    </>
  );
}

interface UserButtonsProps {
  userData: { userId: number; firstName: string; lastName: string };
}

function UserButtons({ userData }: UserButtonsProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  async function logout() {
    await tuconApi.logout();
    console.log("removing queries for me");
    queryClient.resetQueries({ queryKey: ["me"] });
    router.push("/");
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={logout}>
        Log out
      </Button>
      <Avatar className="h-9 w-9">
        <AvatarFallback />
      </Avatar>
    </>
  );
}
