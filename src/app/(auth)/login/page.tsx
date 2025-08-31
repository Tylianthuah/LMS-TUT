import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, GithubIcon } from "lucide-react";
import React from "react";

const LoginPage = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login using your Github account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button variant="outline" className="w-full">
          <GithubIcon className="size-4" />
          Sign in with Github
        </Button>

        <div className="relative mt-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-3 text-muted-foreground">or continue with</span>
        </div>
        
        <form className="grid gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
            <Button type="submit">Continue with email <ArrowRight /></Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
