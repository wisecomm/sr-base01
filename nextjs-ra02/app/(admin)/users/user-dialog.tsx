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
    DialogClose,
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

const userFormSchema = z.object({
    userId: z.string().min(2, "User ID must be at least 2 characters."),
    userName: z.string().min(1, "Name is required."),
    userEmail: z.string().email("Invalid email address."),
    userNick: z.string().min(2, "Nickname must be at least 2 characters."),
    userPwd: z.string().min(4, "Password must be at least 4 characters.").optional().or(z.literal("")),
    useYn: z.string().min(1),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: UserDetail | null;
    onSubmit: (data: Partial<UserDetail>) => Promise<void>;
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
        },
    });

    React.useEffect(() => {
        if (user) {
            form.reset({
                userId: user.userId,
                userName: user.userName,
                userEmail: user.userEmail,
                userNick: user.userNick,
                userPwd: "",
                useYn: user.useYn,
            });
        } else {
            form.reset({
                userId: "",
                userName: "",
                userEmail: "",
                userNick: "",
                userPwd: "",
                useYn: "1",
            });
        }
    }, [user, form]);

    const onFormSubmit = async (data: UserFormValues) => {
        // Remove password if empty in edit mode
        const submitData = { ...data };
        if (isEdit && !data.userPwd) {
            delete submitData.userPwd;
        }
        await onSubmit(submitData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogClose onClick={() => onOpenChange(false)} />
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
