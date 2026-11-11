"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, Mail, MailCheck } from "lucide-react";
import { LOGIN } from "@/constants/path";
import { toast } from "@/hooks/use-toast";
import Api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AnimatedContent } from "@/components/auth/animated-content";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendLink = async () => {
    try {
      setIsLoading(true);
      await Api.post("partner/auth/forgot-password", { email });
      setSent(true);
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description:
          error?.response?.data?.message ||
          "We couldn't send the reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendLink = async () => {
    try {
      setIsLoading(true);
      await Api.post("partner/auth/forgot-password", { email });
      toast({
        title: "Check your mail",
        description: "The password reset link is on its way",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description:
          error?.response?.data?.message ||
          "We couldn't send the reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) sendLink();
  };

  const backLink = (
    <Link
      href={LOGIN}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to sign in
    </Link>
  );

  if (sent) {
    return (
      <AuthLayout>
        <AnimatedContent key="sent">
          <div
            data-pop
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50"
          >
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Check your email
          </h1>
          <p className="mt-2 text-slate-500">
            If an account exists for{" "}
            <span className="font-medium text-slate-900">{email}</span>, a
            password reset link is on its way. It may take a minute to arrive.
          </p>

          <div className="mt-8 space-y-3">
            <Button
              onClick={resendLink}
              disabled={isLoading}
              variant="outline"
              className="h-12 w-full rounded-xl border-slate-200 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend email"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="w-full text-center text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Use a different email
            </button>
          </div>

          <div className="mt-10">{backLink}</div>
        </AnimatedContent>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AnimatedContent key="form">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Forgot your password?
          </h1>
          <p className="mt-2 text-slate-500">
            Enter the email linked to your account and we'll send you a link to
            reset it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 transition-all focus-visible:border-indigo-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-500/10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="group h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8">{backLink}</div>
      </AnimatedContent>
    </AuthLayout>
  );
};

export default ForgotPassword;
