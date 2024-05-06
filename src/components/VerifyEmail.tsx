"use client";

import { trpc } from "@/trpc/client";
import { XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageLoading from "./PageLoading";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">Có lỗi xảy ra</h3>
        <p className="text-muted-foreground text-sm">
          Token không hợp lệ. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
        </div>

        <h3 className="font-semibold text-2xl">Chúc mừng!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Bạn đã xác minh tài khoản email thành công!!.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoading />;
  }
};

export default VerifyEmail;
