"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const featuresSection = [
    {
        title : "Comprehensive Courses",
        description : "Access a wide range of courses across various subjects, designed by industry experts.",
        icon : "📚"
    }
]

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to home page
          toast.success("Successfully logged out!");
        },
      },
    });
  };

  return (
    <div>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center">
          <Badge variant={"secondary"} className="text-sm sm:text-md">
            The Future of Online Education
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="text-sm  sm:text-lg text-muted-foreground">
            Discover a world of knowledge at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/">
              <Button size={"lg"}>Explore Courses</Button>
            </Link>
            <Link href="/login">
              <Button variant={"outline"} size={"lg"}>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
    

      </section>
    </div>
  );
}
