import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Độ dài mật khẩu ít nhất 8 ký tự.",
  }),
  repeatPassword: z.string().nonempty("Không được bỏ trống trường này"),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

export const AuthCredentialsValidatorLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Độ dài mật khẩu ít nhất 8 ký tự.",
  }),
});

export type TAuthCredentialsValidatorLogin = z.infer<
  typeof AuthCredentialsValidatorLogin
>;
