"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MenuInfo } from "@/types";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const menuFormSchema = z.object({
    menuId: z.string().min(2, "Menu ID must be at least 2 characters."),
    menuName: z.string().min(1, "Menu name is required."),
    menuLvl: z.number().min(0),
    menuUri: z.string().optional().or(z.literal("")),
    menuImgUri: z.string().optional().or(z.literal("")),
    upperMenuId: z.string().min(1),
    menuDesc: z.string().optional().or(z.literal("")),
    menuSeq: z.number().min(0).optional(),
    useYn: z.string().min(1),
});

type MenuFormValues = z.infer<typeof menuFormSchema>;

interface MenuFormProps {
    item?: MenuInfo | null;
    allMenus: MenuInfo[];
    onSubmit: (data: Partial<MenuInfo>) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
}

export function MenuForm({ item, allMenus, onSubmit, onDelete }: MenuFormProps) {
    const isEdit = !!(item && item.menuId);

    const form = useForm<MenuFormValues>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: {
            menuId: "",
            menuName: "",
            menuLvl: 1,
            menuUri: "",
            menuImgUri: "",
            upperMenuId: "none",
            menuDesc: "",
            menuSeq: 0,
            useYn: "1",
        },
    });

    React.useEffect(() => {
        if (item) {
            form.reset({
                menuId: item.menuId,
                menuName: item.menuName,
                menuLvl: item.menuLvl,
                menuUri: item.menuUri || "",
                menuImgUri: item.menuImgUri || "",
                upperMenuId: item.upperMenuId || "none",
                menuDesc: item.menuDesc || "",
                menuSeq: item.menuSeq || 0,
                useYn: item.useYn,
            });
        } else {
            form.reset({
                menuId: "",
                menuName: "",
                menuLvl: 1,
                menuUri: "",
                menuImgUri: "",
                upperMenuId: "none",
                menuDesc: "",
                menuSeq: 0,
                useYn: "1",
            });
        }
    }, [item, form]);

    const onFormSubmit = async (data: MenuFormValues) => {
        const sanitizedData: Partial<MenuInfo> = {
            ...data,
            upperMenuId: data.upperMenuId === "none" ? null : data.upperMenuId,
            menuUri: data.menuUri === "" ? null : data.menuUri,
            menuImgUri: data.menuImgUri === "" ? null : data.menuImgUri,
            menuDesc: data.menuDesc === "" ? null : data.menuDesc,
        };
        await onSubmit(sanitizedData);
    };

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    {isEdit ? `Edit Menu: ${item.menuName}` : (item?.upperMenuId && item.upperMenuId !== "none" ? "Add Child Menu" : "Create Root Menu")}
                </CardTitle>
                <CardDescription>
                    Configure menu settings and access control.
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Basic Information</h3>
                                <FormField
                                    control={form.control}
                                    name="menuId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="M001" {...field} disabled={isEdit} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="menuName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dashboard" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="upperMenuId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parent Menu</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Root" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">Root (No Parent)</SelectItem>
                                                    {allMenus
                                                        .filter(m => m.menuId !== item?.menuId) // Prevent self-parenting
                                                        .map(m => (
                                                            <SelectItem key={m.menuId} value={m.menuId}>
                                                                {m.menuName} ({m.menuId})
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Path & Sorting Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Path & Display</h3>
                                <FormField
                                    control={form.control}
                                    name="menuUri"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu URI</FormLabel>
                                            <FormControl>
                                                <Input placeholder="/dashboard" {...field} />
                                            </FormControl>
                                            <FormDescription>Relative URL path for this menu.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="menuImgUri"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu Image URI</FormLabel>
                                            <div className="flex gap-4 items-start">
                                                <FormControl className="flex-1">
                                                    <Input placeholder="/images/icons/dashboard.png" {...field} />
                                                </FormControl>
                                                {field.value && (
                                                    <div className="relative w-10 h-10 border rounded shrink-0 bg-slate-50 flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={field.value}
                                                            alt="Preview"
                                                            fill
                                                            className="object-contain p-1"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <FormDescription>Path to the menu icon/image.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="menuLvl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Level</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="menuSeq"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Display Order</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Controls Section */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <FormField
                                control={form.control}
                                name="useYn"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Use Status</FormLabel>
                                            <FormDescription>Enable or disable this menu.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value === "1"}
                                                onCheckedChange={(checked: boolean) => field.onChange(checked ? "1" : "0")}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="menuDesc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe the purpose of this menu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            {isEdit && onDelete ? (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => onDelete(item.menuId)}
                                >
                                    Delete Menu
                                </Button>
                            ) : <div></div>}
                            <div className="flex gap-4">
                                <Button type="submit">
                                    {isEdit ? "Update Menu" : "Create Menu"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}
