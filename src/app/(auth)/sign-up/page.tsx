"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import PageLoading from "@/components/PageLoading";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ZodError } from "zod";

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("Emai đã tồn tại. Vui lòng chọn email khác.");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Email xác minh đã được gửi đến ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({
    email,
    password,
    repeatPassword,
  }: TAuthCredentialsValidator) => {
    if (password !== repeatPassword) {
      setError("repeatPassword", {
        message: "Mật khẩu không khớp. Vui lòng thử lại.",
      });
      return;
    }
    mutate({ email, password, repeatPassword: repeatPassword });
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Icons className="z-0 w-2/3 absolute top-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-[450px]" />
          <div className="mt-32 rounded-sm w-[400px] h-[400px] container relative flex flex-col items-center justify-center lg:px-0 z-10 bg-cyan-100">
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

                    <div className="grid gap-1 py-2">
                      <Label htmlFor="repeatPassword">Nhập lại mật khẩu</Label>
                      <Input
                        {...register("repeatPassword")}
                        type="password"
                        className={cn({
                          "focus-visible:ring-red-500": errors.repeatPassword,
                        })}
                        placeholder="Repeat Password"
                      />
                      {errors?.repeatPassword && (
                        <p className="text-sm text-red-500">
                          {errors.repeatPassword.message}
                        </p>
                      )}
                    </div>

                    <Button>Đăng ký</Button>
                    <div className="flex flex-col items-center space-y-2 text-center ">
                      <Link
                        className={buttonVariants({
                          variant: "link",
                          className: "gap-1.5 text-purple-950",
                        })}
                        href="/sign-in"
                      >
                        Bạn đã có tài khoản? Đăng nhập ngay
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default Page;
