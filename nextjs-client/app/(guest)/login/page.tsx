"use client";

import React, { useTransition, useState } from "react";
import Image from "next/image";
import { login } from "@/app/actions/auth-actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const setUser = useAppStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);

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
        router.push('/paserver', { scroll: false });
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
    <div className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-[#137fec]/30">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center p-4 pb-3 justify-between max-w-md mx-auto w-full">
          <div className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
            <Image
              src="/images/ap/scan-barcode.svg"
              alt="Barcode Scanner"
              width={24}
              height={24}
              className="brightness-0 saturate-100 invert-[39%] sepia-[91%] font-semibold saturate-[2586%] hue-rotate-[197deg] brightness-[98%] contrast-[93%]"
              style={{ filter: "invert(42%) sepia(93%) saturate(1518%) hue-rotate(189deg) brightness(97%) contrast(92%)" }}
            />
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            재고 관리 시스템
          </h2>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-4 justify-center">
        <div className="flex flex-col items-center pb-8 pt-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
            <Image
              src="/images/ap/boxes.svg"
              alt="Inventory"
              width={32}
              height={32}
              className="invert brightness-0"
            />
          </div>
          <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight text-center mb-2">
            로그인
          </h1>
          <p className="text-slate-500 text-base font-normal leading-relaxed text-center max-w-[300px]">
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
                  <FormLabel className="text-slate-700 text-sm font-semibold leading-normal pb-2 ml-1">
                    사용자 ID
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Image
                            src="/images/ap/id-card-lanyard.svg"
                            alt="ID Card"
                            width={20}
                            height={20}
                            className="opacity-40"
                          />
                        </div>
                        <input
                          {...field}
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] h-14 placeholder:text-slate-400 pl-10 pr-2 text-base font-normal leading-normal transition-all"
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
                    <FormLabel className="text-slate-700 text-sm font-semibold leading-normal">
                      비밀번호
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="flex w-full items-stretch rounded-xl shadow-sm">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Image
                            src="/images/ap/lock-keyhole.svg"
                            alt="Lock"
                            width={20}
                            height={20}
                            className="opacity-40"
                          />
                        </div>
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="flex w-full min-w-0 resize-none overflow-hidden rounded-l-xl border border-slate-300 bg-white text-slate-900 focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] h-14 placeholder:text-slate-400 pl-10 pr-2 text-base font-normal leading-normal transition-all"
                          placeholder="비밀번호 입력"
                        />
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center justify-center px-4 rounded-r-xl border border-l-0 border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors group"
                        type="button"
                      >
                        <Image
                          src={showPassword ? "/images/ap/eye.svg" : "/images/ap/eye-off.svg"}
                          alt="Toggle Password"
                          width={20}
                          height={20}
                          className="opacity-50 group-hover:opacity-80 transition-opacity"
                        />
                      </button>
                    </div>
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormMessage />
                    <a className="text-sm font-medium text-[#137fec] hover:text-blue-700 transition-colors ml-auto" href="#">
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
                "flex w-full items-center justify-center rounded-xl bg-[#137fec] h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 mt-2",
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
