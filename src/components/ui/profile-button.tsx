"use client"

import {
  BookOpenIcon,
  ChevronDownIcon,
  HomeIcon,
  LogOutIcon,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";


export default function ProfileButton() {

  const {data: session} = authClient.useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={session?.user.image || ""} alt="Profile image" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={20}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 pr-4" align="end" sideOffset={20}>
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
           {session?.user.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal mt-1">
            {session?.user.email}   
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <HomeIcon size={16} className="opacity-60 mt-1" aria-hidden="true" />
              <span className="text-xs">Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/courses">
              <BookOpenIcon size={16} className="opacity-60 mt-1" aria-hidden="true" />
              <span className="text-xs">Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <BookOpenIcon size={16} className="opacity-60 mt-1" aria-hidden="true" />
              <span className="text-xs">Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert("Logout")}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span className="text-xs">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
