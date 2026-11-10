"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { HOME, FORGOTPASSWORD } from "@/constants/path";
import { toast } from "@/hooks/use-toast";
import Api from "@/utils/api";
import { useUserStore } from "@/utils/user-store";
import { csrfStore } from "@/utils/global-state-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { AnimatedContent } from "@/components/auth/animated-content";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useUserStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await Api.post("partner/auth/login", { email, password });

      if (response.status === 200) {
        const { accessToken, partner, csrfToken } = response.data.data;

        if (csrfToken) csrfStore.setToken(csrfToken);

        login(partner, accessToken);
        Api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        const previousRoute = sessionStorage.getItem("previousRoute");
        if (previousRoute) {
          router.push(previousRoute);
          sessionStorage.removeItem("previousRoute");
        } else {
          router.push(HOME);
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Login failed",
        description:
          error?.response?.data?.message ||
          "Unable to login. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout>
      <AnimatedContent>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-500">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <Link
                href={FORGOTPASSWORD}
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="group h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </AnimatedContent>
    </AuthLayout>
  );
};

export default Login;