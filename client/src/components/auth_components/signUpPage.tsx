"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { FormDataOfSignUpPage } from "./authFormData";
import CommonForm from "../CommonForm/CommonForm";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { registerPageSchema, RegisterPageSchemaType } from "./authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUpProtectionRulesAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const SignUpPage = () => {
  const [isPendinng, startTransition] = useTransition();
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const form = useForm<RegisterPageSchemaType>({
    resolver: zodResolver(registerPageSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSignUp = async (signUpData: RegisterPageSchemaType) => {
    console.log(signUpData, "signUpData");
    startTransition(async () => {
      const validateSignUpRule = await signUpProtectionRulesAction(
        signUpData.email
      );
      console.log("Check validation :", validateSignUpRule);

      if (!validateSignUpRule.success) {
        console.log(validateSignUpRule.error);

        toast.error(validateSignUpRule.error, {
          description: "From Arcjet",
        });
        return;
      }
      const response = await register({
        email: signUpData.email,
        name: signUpData.name,
        password: signUpData.password,
      });
      if (!response.success) {
        toast.error(response.message);
      }
      toast.success(response.message);
      console.log(response.data, "userId");
    });
  };
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSignUp)}
        className="flex flex-col gap-6 px-6 py-4 lg:px-8 border rounded-2xl shadow-2xl lg:w-[650px]"
      >
        <div className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-5xl font-bold text-sky-600 p-1">
            Create an Account
          </h1>
          <h4 className="text-muted-foreground">
            create an account and keep credential for{" "}
            <span className="underline font-bold uppercase">login?</span>
          </h4>
        </div>
        <div>
          {FormDataOfSignUpPage && FormDataOfSignUpPage.length > 0
            ? FormDataOfSignUpPage.map((formData, index) => {
                return (
                  <CommonForm form={form} formData={formData} key={index} />
                );
              })
            : null}
          <Link href={"/auth/login"} className="flex items-center justify-end">
            <Badge variant={"secondary"} className=" text-green-600 underline">
              Already have an account ? Go-to{" "}
              <span className="font-bold text-blue-500 underline text-sm cursor-pointer">
                Login
              </span>
            </Badge>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant={"outline"}
            className="flex px-4 py-1 lg:px-12 lg:py-1 lg:w-[250px]"
            disabled={!form.formState.isValid}
          >
            SignUp
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpPage;
