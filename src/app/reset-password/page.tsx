"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, CheckCircle2, Loader2, LinkIcon } from "lucide-react";
import { FORGOTPASSWORD, LOGIN } from "@/constants/path";
import { toast } from "@/hooks/use-toast";
import Api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { AnimatedContent } from "@/components/auth/animated-content";

const RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const STRENGTH_COLORS = [
  "bg-slate-200",
  "bg-red-400",
  "bg-amber-400",
  "bg-lime-500",
  "bg-emerald-500",
];

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const passed = useMemo(
    () => RULES.map((r) => r.test(password)),
    [password]
  );
  const score = passed.filter(Boolean).length;
  const allValid = score === RULES.length;
  const matches = confirm.length > 0 && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid || !matches || isLoading) return;

    try {
      setIsLoading(true);
      await Api.post("partner/auth/reset-password", { token, password });
      setDone(true);
      setTimeout(() => router.push(LOGIN), 2500);
    } catch (error: any) {
      toast({
        title: "Couldn't reset password",
        description:
          error?.response?.data?.message ||
          "This link may have expired. Please request a new one.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Missing token
  if (!token) {
    return (
      <AuthLayout>
        <AnimatedContent key="invalid">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
            <LinkIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Invalid reset link
            </h1>
            <p className="mt-2 text-slate-500">
            This link is missing or has expired. Request a new one and we'll send
            a fresh link to your email.
            </p>
            <Button
            asChild
            className="mt-8 h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-medium text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
            >
            <Link href={FORGOTPASSWORD}>Request a new link</Link>
            </Button>
        </AnimatedContent>
      </AuthLayout>
    );
  }

  // Success
  if (done) {
    return (
      <AuthLayout>
        <AnimatedContent key="done">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Password updated
            </h1>
            <p className="mt-2 text-slate-500">
            You can now sign in with your new password. Redirecting you...
            </p>
            <Button
            asChild
            className="mt-8 h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-medium text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
            >
            <Link href={LOGIN}>Continue to sign in</Link>
            </Button>
        </AnimatedContent>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AnimatedContent key="form">

        <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Set a new password
            </h1>
            <p className="mt-2 text-slate-500">
            Choose a strong password you haven't used elsewhere.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                New password
            </Label>
            <PasswordInput
                id="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Strength meter */}
            <div className="flex gap-1.5 pt-1">
                {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    password && i <= score
                        ? STRENGTH_COLORS[score]
                        : "bg-slate-200"
                    }`}
                />
                ))}
            </div>

            <ul className="grid grid-cols-1 gap-1.5 pt-2 sm:grid-cols-2">
                {RULES.map((rule, i) => (
                <li
                    key={rule.label}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                    passed[i] ? "text-emerald-600" : "text-slate-400"
                    }`}
                >
                    <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                        passed[i] ? "bg-emerald-100" : "bg-slate-100"
                    }`}
                    >
                    <Check className="h-2.5 w-2.5" />
                    </span>
                    {rule.label}
                </li>
                ))}
            </ul>
            </div>

            <div className="space-y-2">
            <Label htmlFor="confirm" className="text-sm font-medium text-slate-700">
                Confirm password
            </Label>
            <PasswordInput
                id="confirm"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
            />
            {mismatch && (
                <p className="text-xs text-red-500">Passwords don't match yet.</p>
            )}
            </div>

            <Button
            type="submit"
            disabled={isLoading || !allValid || !matches}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 disabled:opacity-60"
            >
            {isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
                </>
            ) : (
                "Reset password"
            )}
            </Button>
        </form>

        <Link
            href={LOGIN}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
        </Link>
      </AnimatedContent>
    </AuthLayout>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}