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
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

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

        {/* Vertical divider - uncomment if you want to use it */}
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
    queryClient.resetQueries({ queryKey: ["me"] });
    router.push("/");
  }

  const message = "isStudent";

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-end">
        <span className="text-[16px] text-secondary">
          {userData.firstName} {userData.lastName}
        </span>
        {message === "isStudent" ? (
          <span className="text-xs text-secondary opacity-50">Student</span>
        ) : (
          <span className="text-xs text-secondary opacity-50">Tutor</span>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-30 mr-7">
          <DropdownMenuItem onClick={() => router.push("/view-profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-secondary opacity-15" />

          <DropdownMenuItem onClick={logout} className="text-danger">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
