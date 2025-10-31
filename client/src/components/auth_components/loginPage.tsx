"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginPageSchema, LoginPageSchemaType } from "./authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { FormDataOfLoginPage } from "./authFormData";
import CommonForm from "../CommonForm/CommonForm";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import {
  signInProtectionRulesAction,
  signUpProtectionRulesAction,
} from "@/actions/auth";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [isPendinng, startTransition] = useTransition();
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const form = useForm<LoginPageSchemaType>({
    resolver: zodResolver(loginPageSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: LoginPageSchemaType) => {
    console.log(data);

    startTransition(async () => {
      try {
        console.log("Handle called from signUp");
        const validationCheckUsingSignInProtection =
          await signInProtectionRulesAction(data.email);
        if (!validationCheckUsingSignInProtection.success) {
          toast.error(validationCheckUsingSignInProtection.error);
          return;
        }
        if (validationCheckUsingSignInProtection.success) {
          const response = await login({
            email: data.email,
            password: data.password,
          });
          if (!response.success) {
            toast.error(response.message);
          }
          toast.success(response.message);
          const user = useAuthStore.getState().user;
          if (user?.role === "SUPERADMIN") {
            router.push("/super-admin");
          } else if (user?.role === "USER") {
            router.push("/user");
          } else {
            router.push("/auth/login");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    });
  };
  return (
    <Form {...form}>
      <form
        id="user-login-form"
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col bg-neutral-50 gap-6 border rounded-2xl 
        lg:w-[600px] shadow-xl drop-shadow-2xl "
      >
        <div className="flex flex-col gap-2 items-center justify-center mt-4 ">
          <h1 className="text-7xl font-bold text-sky-500 font-stretch-95% px-4">
            Welcome
          </h1>
          <h4 className="text-muted-foreground">Login with Email ID</h4>
        </div>
        <div className="mx-8 flex flex-col gap-4">
          {FormDataOfLoginPage && FormDataOfLoginPage.length > 0
            ? FormDataOfLoginPage.map((formData, index) => {
                return (
                  <CommonForm form={form} formData={formData} key={index} />
                );
              })
            : null}
          <div className="flex items-center justify-between">
            <Link
              href={""}
              className="underline text-sky-600 flex items-center justify-end"
            >
              <Badge
                variant={"secondary"}
                className="text-sky-600 cursor-pointer"
              >
                Forget your password ?
              </Badge>
            </Link>
            <Link
              href={"/auth/register"}
              className="underline text-sky-600 flex items-center justify-end"
            >
              <Badge
                variant={"secondary"}
                className="text-orange-600 underline"
              >
                If you Don't have an account ?{" "}
                <span className="font-bold text-red-500 underline text-sm cursor-pointer">
                  Please SignUp
                </span>
              </Badge>
            </Link>
          </div>
        </div>
        <div className="flex mb-4 items-center justify-center">
          <Button
            type="submit"
            variant={"outline"}
            form="user-login-form"
            className="mx-6 px-6 py-1 w-[250px]"
            disabled={!form.formState.isValid}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
