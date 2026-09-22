"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  useResendOTP,
  useVerifyAccount,
  useVerifyDoctorAccount,
} from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

const RESEND_COOLDOWN = 5;

export default function VerifyAccountForm({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyPatient, isPending: verifyPending } =
    useVerifyAccount();
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();
  const { mutate: resend, isPending: resendPending } = useResendOTP();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again later.",
            type: "error",
          });
        }
        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description:
              "An admin will approve your account. This may take upto 3 business days. Please be patient and keep an eye on your email for further instructions.",
            type: "success",
          });
          router.push("/");
        }

        toast.add({
          title: "Verification Successful",
          description:
            "Your account has been verified successfully. You can now log in.",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification Failed",
          description:
            err.message || "Please check your information and try again.",
          type: "error",
        });
      },
    });

    console.log(verifyData);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) {
      return;
    }

    setResendTimer(RESEND_COOLDOWN);

    resend(
      { email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again later.",
              type: "error",
            });
          }
          toast.add({
            title: "Verification OTP Resent Successful",
            description:
              "The verification OTP has been resent successfully. Please check your email.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Verification Failed",
            description:
              err.message || "Please check your information and try again.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          Please provide the verification code sent to{" "}
          <span className="font-medium font-bold">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            {resendTimer > 0 && (
              <FieldDescription>Resend in : {resendTimer}</FieldDescription>
            )}
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={resendTimer > 0}
          onClick={() => {
            handleResendOtp();
          }}
        >
          Resend
        </Button>
        <Button disabled={verifyPending} type="submit" form="otp-form">
          {verifyPending ? (
            <>
              <Spinner /> Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
