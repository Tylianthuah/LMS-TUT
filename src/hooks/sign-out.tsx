import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signOut = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to home page
          toast.success("Successfully logged out!");
        },
      },
    });
  };

  return handleSignOut;
};

export default signOut;
    