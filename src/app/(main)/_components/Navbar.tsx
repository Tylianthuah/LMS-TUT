import ProfileButton from "@/components/ui/profile-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-10 flex w-full sticky justify-between min-h-16 items-center border-b z-50 bg-background/90 backdrop-blur-lg">
      <h1 className="font-bold text-xl tracking-tight">LMS-TUT</h1>
      <nav className="sm:flex gap-20 items-center">
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
        <ProfileButton />
      </div>
    </div>
  );
};

export default Navbar;
