"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RoleInfo } from "@/types";
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
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const roleFormSchema = z.object({
    roleId: z.string().min(2, "Role ID must be at least 2 characters."),
    roleName: z.string().min(1, "Name is required."),
    roleDesc: z.string().optional().or(z.literal("")),
    useYn: z.string().min(1),
});

type RoleFormValues = z.infer<typeof roleFormSchema>;

interface RoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role?: RoleInfo | null;
    onSubmit: (data: Partial<RoleInfo>) => Promise<void>;
}

export function RoleDialog({ open, onOpenChange, role, onSubmit }: RoleDialogProps) {
    const isEdit = !!role;

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
            roleId: "",
            roleName: "",
            roleDesc: "",
            useYn: "1",
        },
    });

    React.useEffect(() => {
        if (open) {
            if (role) {
                form.reset({
                    roleId: role.roleId || "",
                    roleName: role.roleName || "",
                    roleDesc: role.roleDesc || "",
                    useYn: role.useYn || "1",
                });
            } else {
                form.reset({
                    roleId: "",
                    roleName: "",
                    roleDesc: "",
                    useYn: "1",
                });
            }
        }
    }, [open, role, form]);

    const onFormSubmit = async (data: RoleFormValues) => {
        await onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} closeOnOutsideClick={false}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Role" : "Add New Role"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update role information below."
                            : "Enter the details for the new role."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="roleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ROLE_USER" {...field} disabled={isEdit} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="General User" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleDesc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the permissions of this role..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="useYn"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Use Status</FormLabel>
                                        <FormDescription>Enable or disable this role.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value === "1"}
                                            onCheckedChange={(checked) => field.onChange(checked ? "1" : "0")}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEdit ? "Save Changes" : "Create Role"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
