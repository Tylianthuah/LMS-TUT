"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startVerificationTransition] = useTransition();
  const param = useSearchParams();
  const email = param.get("email") as string;
  const isVerifiedOtp = otp.length === 6;

  const handleEmailVerification = () => {
    startVerificationTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully!");
            router.push("/");
          },
          onError: () => {
            toast.error("Error verifying email.");
          },
        },
      });
    });
  };

  return (
    <Card className="py-8">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify your Email</CardTitle>
        <CardDescription className="text-sm mt-1">
          Please check your email for a verification link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-xs text-muted-foreground">
            Enter the 6-digit OTP sent to your email.
          </p>
        </div>

        <Button
          onClick={handleEmailVerification}
          className="mt-10 w-full"
          disabled={emailPending || !isVerifiedOtp}
        >
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>Verify OTP</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
