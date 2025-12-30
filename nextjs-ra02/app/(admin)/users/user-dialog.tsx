"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserDetail } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { getRoles } from "../roles/actions";
import { getUserRoles } from "./actions";
import { Checkbox } from "@/components/ui/checkbox";


const userFormSchema = z.object({
    userId: z.string().min(2, "User ID must be at least 2 characters."),
    userName: z.string().min(1, "Name is required."),
    userEmail: z.string().email("Invalid email address."),
    userNick: z.string().min(2, "Nickname must be at least 2 characters."),
    userPwd: z.string().min(4, "Password must be at least 4 characters.").optional().or(z.literal("")),
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

    const [allRoles, setAllRoles] = React.useState<{ roleId: string; roleName: string }[]>([]);

    React.useEffect(() => {
        const loadInitialData = async () => {
            if (!open) return;

            // 1. Load all roles once if needed
            try {
                const rolesRes = await getRoles(0, 100);
                if (rolesRes.code === "200" && rolesRes.data) {
                    setAllRoles(rolesRes.data.list.map(r => ({ roleId: r.roleId, roleName: r.roleName })));
                }

                // 2. Load user roles if editing
                if (user) {
                    const userRolesRes = await getUserRoles(user.userId);
                    const assignedRoleIds = userRolesRes.code === "200" && userRolesRes.data ? userRolesRes.data : [];

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
            } catch (error) {
                console.error("Failed to load user dialog data:", error);
            }
        };

        loadInitialData();
    }, [open, user, form]);

    const onFormSubmit = async (data: UserFormValues) => {
        const { roleIds, ...rest } = data;
        // Remove password if empty in edit mode
        const submitData = { ...rest };
        if (isEdit && !data.userPwd) {
            delete submitData.userPwd;
        }
        await onSubmit(submitData, roleIds);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} closeOnOutsideClick={false}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update user information below."
                            : "Enter the details for the new user account."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user01" {...field} disabled={isEdit} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userNick"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nickname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe" {...field} />
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
                                    <FormLabel>Password {isEdit && "(Leave blank to keep current)"}</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roles</FormLabel>
                                    <div className="grid grid-cols-2 gap-2 mt-2 border rounded-md p-3 max-h-[150px] overflow-y-auto bg-white dark:bg-slate-950">
                                        {allRoles.map((role) => (
                                            <div key={role.roleId} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`role-${role.roleId}`}
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
                                                <label
                                                    htmlFor={`role-${role.roleId}`}
                                                    className="text-sm font-medium text-slate-900 dark:text-slate-100 cursor-pointer"
                                                >
                                                    {role.roleName}
                                                </label>
                                            </div>
                                        ))}
                                        {allRoles.length === 0 && (
                                            <div className="col-span-2 text-center text-xs text-slate-500 py-2">
                                                No roles available.
                                            </div>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Save Changes" : "Create User"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
