"use client";

import ProfileButton from "@/app/(main)/_components/profile-button";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";


const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  return (
    <div className="sm:px-10 px-4 flex w-full sticky top-0 left-0 justify-between min-h-16 items-center border-b z-50 bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <h1 className="font-bold text-xl tracking-tight">LMS-TUT</h1>
      <nav className="hidden sm:flex sm:gap-5 md:gap-10 lg:gap-20 items-center">
        <Link
          href="/"
          className="text-sm font-semibold hover:underline hover:underline-offset-6 hover:decoration-muted-foreground"
        >
          Home
        </Link>
        <Link
          href="/courses"
          className="text-sm font-semibold hover:underline hover:underline-offset-6 hover:decoration-muted-foreground"
        >
          Courses
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-semibold hover:underline hover:underline-offset-6 hover:decoration-muted-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/support"
          className="text-sm font-semibold hover:underline hover:underline-offset-6 hover:decoration-muted-foreground"
        >
          Support
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {isPending ? null : session ? (
          <ProfileButton name={session.user.name} image={session.user.image || ""} email={session.user.email} />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
