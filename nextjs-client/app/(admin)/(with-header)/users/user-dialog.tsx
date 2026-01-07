"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserDetail } from "@/types";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRoles } from "@/hooks/useRoleQuery";
import { useUserRoles } from "@/hooks/useUserQuery";
import { UserPlus, Mail, Lock, IdCard } from "lucide-react";

const userFormSchema = z.object({
    userId: z.string().min(2, "사용자 ID는 2글자 이상이어야 합니다."),
    userName: z.string().min(1, "이름은 필수입니다."),
    userEmail: z.string().email("유효하지 않은 이메일 주소입니다."),
    userNick: z.string().min(2, "닉네임은 2글자 이상이어야 합니다."),
    userPwd: z.string().min(4, "비밀번호는 4글자 이상이어야 합니다.").optional().or(z.literal("")),
    useYn: z.string().min(1),
    roleIds: z.array(z.string()),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: UserDetail | null;
    onSubmit: (data: Partial<UserDetail>, roleIds: string[]) => Promise<void>;
}

export function UserDialog({ open, onOpenChange, user, onSubmit }: UserDialogProps) {
    const isEdit = !!user;
    const { data: rolesData } = useRoles(0, 100);
    const { data: fetchedRoleIds, isLoading: isUserRolesLoading } = useUserRoles(user?.userId);
    const assignedRoleIds = React.useMemo(() => fetchedRoleIds || [], [fetchedRoleIds]);

    const allRoles = React.useMemo(() => {
        return rolesData?.list.map(r => ({ roleId: r.roleId, roleName: r.roleName })) || [];
    }, [rolesData]);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            userId: "",
            userName: "",
            userEmail: "",
            userNick: "",
            userPwd: "",
            useYn: "1",
            roleIds: [],
        },
    });

    React.useEffect(() => {
        if (open) {
            if (user) {
                form.reset({
                    userId: user.userId || "",
                    userName: user.userName || "",
                    userEmail: user.userEmail || "",
                    userNick: user.userNick || "",
                    userPwd: "",
                    useYn: user.useYn || "1",
                    roleIds: assignedRoleIds,
                });
            } else {
                form.reset({
                    userId: "",
                    userName: "",
                    userEmail: "",
                    userNick: "",
                    userPwd: "",
                    useYn: "1",
                    roleIds: [],
                });
            }
        }
    }, [open, user, assignedRoleIds, form]);

    const onFormSubmit = async (data: UserFormValues) => {
        const { roleIds, ...rest } = data;
        const submitData: Partial<UserDetail> & { userPwd?: string } = { ...rest };
        if (isEdit && !data.userPwd) {
            delete submitData.userPwd;
        }
        await onSubmit(submitData, roleIds);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} closeOnOutsideClick={false}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-white dark:bg-[#2d2d2d] rounded-xl border-none shadow-2xl">
                <div className="bg-white dark:bg-[#2d2d2d] px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <UserPlus className="text-[#FF5722] w-6 h-6" />
                        {isEdit ? "사용자 수정" : "사용자 추가"}
                    </h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="px-6 py-6 space-y-5">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                        아이디 <span className="text-[#FF5722]">*</span>
                                    </FormLabel>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IdCard className="text-gray-400 w-5 h-5" />
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-[#FF5722] focus:border-[#FF5722] block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md py-2.5 placeholder-gray-400"
                                                placeholder="사용자 아이디를 입력하세요"
                                                {...field}
                                                disabled={isEdit}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                            이름 <span className="text-[#FF5722]">*</span>
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    className="focus-visible:ring-[#FF5722] focus:border-[#FF5722] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md py-2.5 placeholder-gray-400"
                                                    placeholder="실명 입력"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="userNick"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                            닉네임
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    className="focus-visible:ring-[#FF5722] focus:border-[#FF5722] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md py-2.5 placeholder-gray-400"
                                                    placeholder="닉네임 입력"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="userEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                        이메일 <span className="text-[#FF5722]">*</span>
                                    </FormLabel>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="text-gray-400 w-5 h-5" />
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-[#FF5722] focus:border-[#FF5722] block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md py-2.5 placeholder-gray-400"
                                                placeholder="example@company.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userPwd"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                        {isEdit ? "새 비밀번호" : "초기 비밀번호"}
                                    </FormLabel>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="text-gray-400 w-5 h-5" />
                                        </div>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="focus-visible:ring-[#FF5722] focus:border-[#FF5722] block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md py-2.5 placeholder-gray-400"
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="roleIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                        권한
                                    </FormLabel>
                                    <div className="bg-white dark:bg-[#2d2d2d] border border-gray-300 dark:border-gray-600 rounded-lg p-5">
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                            {isUserRolesLoading && isEdit ? (
                                                <div className="col-span-2 text-center text-xs text-slate-500 py-2">권한 로딩 중...</div>
                                            ) : (
                                                allRoles.map((role) => (
                                                    <label key={role.roleId} className="inline-flex items-center space-x-3 cursor-pointer group">
                                                        <Checkbox
                                                            className="h-5 w-5 rounded border-gray-300 text-[#FF5722] focus:ring-[#FF5722] data-[state=checked]:bg-[#FF5722] data-[state=checked]:border-[#FF5722] dark:border-gray-600 dark:bg-gray-800"
                                                            checked={field.value?.includes(role.roleId)}
                                                            onCheckedChange={(checked) => {
                                                                const current = field.value || [];
                                                                if (checked) {
                                                                    field.onChange([...current, role.roleId]);
                                                                } else {
                                                                    field.onChange(current.filter((id) => id !== role.roleId));
                                                                }
                                                            }}
                                                        />
                                                        <span className="text-base font-normal text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                                            {role.roleName}
                                                        </span>
                                                    </label>
                                                ))
                                            )}
                                        </div>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="bg-white dark:bg-[#2d2d2d] border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                className="px-4 py-2 bg-white dark:bg-[#2d2d2d] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                취소
                            </Button>
                            <Button
                                type="submit"
                                className="px-6 py-2 bg-[#FF5722] border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:opacity-90 hover:bg-[#FF5722]"
                            >
                                저장
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
