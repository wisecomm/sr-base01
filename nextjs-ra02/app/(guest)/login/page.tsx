"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { login } from "@/app/actions/auth-actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from 'next/navigation';

const accountFormSchema = z.object({
  userId: z.string().min(1, {
    message: "사용자 아이디을 입력하세요.",
  }),
  userPwd: z.string().min(4, {
    message: "패스워드는 4자리 이상입니다.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  userId: "",
  userPwd: "",
};

function Login() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const onSubmit = (data: AccountFormValues) => {
    startTransition(async () => {
      try {
        console.log(data);

        // Server Action 호출
        const formData = new FormData();
        formData.append('userid', data.userId);
        formData.append('password', data.userPwd);

        const loginResult = await login(formData);

        if (loginResult.code !== '200') {
          toast({
            title: "Login Failed",
            description: loginResult.message,
            variant: "destructive",
          });
          return;
        }
        /*
                toast({
                  title: "Login Success",
                  description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">
                        {JSON.stringify(loginResult.data, null, 2)}
                      </code>
                    </pre>
                  ),
                });
        */
        router.push('/paserver', { scroll: false });
      } catch (error: unknown) {
        console.log("onSubmit error: " + error);
        toast({
          title: "Error",
          description: "로그인 처리 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="p-8 space-y-6 bg-white rounded shadow-md w-[400px]">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div className="flex justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용자 아이디</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your userid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userPwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>패스워드</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            disabled={isPending}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
