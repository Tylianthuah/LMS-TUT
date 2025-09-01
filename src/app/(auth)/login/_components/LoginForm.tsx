"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, GithubIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [isGithubPending, gitHubTransition] = useTransition();
  const [isEmailPending, EmailTransition] = useTransition();

  const handleGithubLogin = async () => {
    gitHubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully logged in!. Redirecting to homepage..."
            );
          },
          onError: (error) => {
            toast.error(`Internal server Error`);
          },
        },
      });
    });
  };


  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = e.currentTarget.email.value as string;
    EmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type : "sign-in",
        fetchOptions : {
          onSuccess : () => {
            toast.success("Verification email sent! Please check your inbox.");
            router.push(`/verify-email?email=${email}`);
          },
          onError : () => {
            toast.error("Error sending verification email.");
          }
        }
      })
    })
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login using your Github or Email account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button disabled={isGithubPending} variant="outline" onClick={handleGithubLogin} className="w-full">
          {isGithubPending ? (
            <>
              <Loader  className="size-4 animate-spin"/>
              <span>Signing in with Github...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>

        <div className="relative mt-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-3 text-muted-foreground">
            or continue with
          </span>
        </div>

        <form onSubmit={handleEmailLogin} className="grid gap-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com"/>
          <Button type="submit" disabled={isEmailPending}>
            {isEmailPending ? (
              <>
                <Loader className="size-4 animate-spin"/>
                <span>Sending verification email...</span>
              </>
            ) : (
              <>
                Continue with email <ArrowRight />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
