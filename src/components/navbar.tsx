import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  message: string;
}

export function Navbar({ message }: NavbarProps) {
  return (
    <header className="flex h-14 items-center border-b-2 border-secondary px-4 lg:px-6">
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

      <Divider
        className="my-4 ml-3 mr-4 h-8 bg-secondary"
        orientation="vertical"
      />

      {message === "isStudent" ? (
        <div className="flex">
          <Button
            asChild
            variant="ghost"
            size="nav_sm"
            className="text-secondary"
          >
            <Link href="/matching">Match</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="nav_sm"
            className="text-secondary"
          >
            <Link href="/matching">Chat</Link>
          </Button>
        </div>
      ) : (
        <Button
          asChild
          variant="ghost"
          size="nav_sm"
          className="text-secondary"
        >
          <Link href="/matching">Chat</Link>
        </Button>
      )}

      {/* User name + icon and once icon is clicked - dropdown menu*/}
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <div className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-[16px] text-secondary">User Name</span>
              {message === "isStudent" ? (
                <span className="text-xs text-secondary opacity-50">
                  Student
                </span>
              ) : (
                <span className="text-xs text-secondary opacity-50">Tutor</span>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  alt="User Name"
                  src="/default-profile.png"
                  height={100}
                  width={100}
                  className="h-10 w-10 cursor-pointer rounded-full"
                  priority
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30 mr-7">
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-secondary opacity-15" />
                <DropdownMenuItem>
                  <Link className="text-danger" href="/">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
