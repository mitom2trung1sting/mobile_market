"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  AuthCredentialsValidatorLogin,
  TAuthCredentialsValidatorLogin,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidatorLogin>({
    resolver: zodResolver(AuthCredentialsValidatorLogin),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Đăng nhập thành công!!");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidatorLogin) => {
    signIn({ email, password });
  };

  return (
    <>
      <Icons className="z-0 w-2/3 absolute top-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-[450px]" />
      <div className="mt-48 rounded-sm w-[400px] h-[300px]  container relative flex flex-col items-center justify-center lg:px-0 bg-cyan-100 z-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Đăng nhập
                </Button>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-1.5 text-purple-950",
                    })}
                    href="/sign-up"
                  >
                    Bạn chưa có tài khoản? Đăng ký ngay
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
