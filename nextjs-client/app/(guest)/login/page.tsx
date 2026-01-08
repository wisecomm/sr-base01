"use client";

import React, { useTransition, useState, useEffect } from "react";
import {
  ScanBarcode,
  Boxes,
  IdCard,
  LockKeyhole,
  Eye,
  EyeOff
} from "lucide-react";
import { login, getAccessToken } from "@/app/actions/auth-actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from 'next/navigation';
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const accountFormSchema = z.object({
  userId: z.string().min(1, {
    message: "사용자 아이디를 입력하세요.",
  }),
  userPwd: z.string().min(4, {
    message: "패스워드는 4자리 이상입니다.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  userId: "admin",
  userPwd: "12345678",
};

function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const setUser = useAppStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      router.replace("/payments");
    }
  }, [router]);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const onSubmit = (data: AccountFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('userid', data.userId);
        formData.append('password', data.userPwd);

        const loginResult = await login(formData);

        if (loginResult.code !== '200' || !loginResult.data) {
          toast({
            title: "로그인 실패",
            description: loginResult.message,
            variant: "destructive",
          });
          return;
        }

        setUser(loginResult.data.user);
        router.replace('/mainmenu', { scroll: false });
      } catch (error: unknown) {
        console.error("onSubmit error:", error);
        toast({
          title: "오류",
          description: "로그인 처리 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="font-sans bg-muted text-foreground min-h-screen flex flex-col antialiased selection:bg-primary/30">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center p-4 pb-3 justify-between max-w-md mx-auto w-full">
          <div className="text-primary flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <ScanBarcode className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            재고 관리 시스템
          </h2>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-4 justify-center">
        <div className="flex flex-col items-center pb-8 pt-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30 mb-6">
            <Boxes className="h-9 w-9 text-white stroke-[1.5]" />
          </div>
          <h1 className="text-foreground tracking-tight text-[32px] font-bold leading-tight text-center mb-2">
            로그인
          </h1>
          <p className="text-muted-foreground text-base font-normal leading-relaxed text-center max-w-[300px]">
            작업자 ID와 비밀번호를 입력하거나<br />사원증을 스캔하세요.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            {/* User ID Field */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full space-y-0">
                  <FormLabel className="text-muted-foreground text-sm font-semibold leading-normal pb-2 ml-1">
                    사용자 ID
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-muted-foreground">
                          <IdCard className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-border bg-background text-foreground focus:outline-0 focus:ring-2 focus:ring-ring focus:border-primary h-14 placeholder:text-muted-foreground pl-10 pr-2 text-base font-normal leading-normal transition-all"
                          placeholder="ID 입력"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="userPwd"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full space-y-0">
                  <div className="flex justify-between items-baseline pb-2 px-1">
                    <FormLabel className="text-muted-foreground text-sm font-semibold leading-normal">
                      비밀번호
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-muted-foreground">
                          <LockKeyhole className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-l-xl border border-border bg-background text-foreground focus:outline-0 focus:ring-2 focus:ring-ring focus:border-primary h-14 placeholder:text-muted-foreground pl-10 pr-2 text-base font-normal leading-normal transition-all"
                          placeholder="비밀번호 입력"
                        />
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center justify-center px-4 rounded-r-xl border border-l-0 border-border bg-muted hover:bg-muted transition-colors group"
                        type="button"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5 text-muted-foreground group-hover:text-muted-foreground transition-colors" />
                        ) : (
                          <EyeOff className="h-5 w-5 text-muted-foreground group-hover:text-muted-foreground transition-colors" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormMessage />
                    <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors ml-auto" href="#">
                      비밀번호 찾기
                    </a>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "flex w-full items-center justify-center rounded-xl bg-primary h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mt-2",
                isPending && "opacity-70 cursor-not-allowed"
              )}
            >
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}

export default Login;
