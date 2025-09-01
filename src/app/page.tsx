"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient} from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      <h1>Homepage</h1>
      <ThemeToggle />
      {session ? (
        <>
          Welcome back!, {session.user.name}
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
