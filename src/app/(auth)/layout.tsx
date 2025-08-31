import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-svh items-center justify-center">
      <Link href="/" className={buttonVariants({
        variant: "ghost",
        className: "absolute left-4 top-4"
      })}>
        <ArrowLeft />
      </Link>
      <div className="sm:max-w-sm max-w-xs w-full flex gap-6 flex-col">
        {children}
        <p className="text-sm text-muted-foreground px-8 text-center text-wrap">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
        </div>
    </div>
  );
};

export default AuthLayout;
