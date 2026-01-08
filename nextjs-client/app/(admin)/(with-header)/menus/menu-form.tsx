"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
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
                    {isEdit ? `메뉴 : ${item.menuName}` : (item?.upperMenuId && item.upperMenuId !== "none" ? "Add Child Menu" : "Create Root Menu")}
                </CardTitle>
                <CardDescription>
                    Configure menu settings and access control.
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Basic Info Section */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basic Information</h3>
                                <FormField
                                    control={form.control}
                                    name="menuId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>메뉴 아이디</FormLabel>
                                            <FormControl>
                                                <Input placeholder="예: M00001" {...field} disabled={isEdit} className="py-2.5" />
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
                                            <FormLabel>메뉴 이름</FormLabel>
                                            <FormControl>
                                                <Input placeholder="메뉴 이름을 입력하세요" {...field} className="py-2.5" />
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
                                            <FormLabel>부모 메뉴</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="py-2.5">
                                                        <SelectValue placeholder="상위 메뉴 선택 (없음)" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">상위 메뉴 선택 (없음)</SelectItem>
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
                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Path & Display</h3>
                                <FormField
                                    control={form.control}
                                    name="menuUri"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>메뉴 URI</FormLabel>
                                            <FormControl>
                                                <Input placeholder="/path/to/menu" {...field} className="py-2.5" />
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
                                            <FormLabel>메뉴 이미지 URI</FormLabel>
                                            <div className="flex gap-2 items-start">
                                                <FormControl className="flex-1">
                                                    <Input placeholder="/images/menus/icon.svg" {...field} className="py-2.5" />
                                                </FormControl>
                                                <Button type="button" variant="outline" size="icon" className="shrink-0 bg-background dark:bg-input">
                                                    <Settings className="h-4 w-4" />
                                                </Button>
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
                                                <FormLabel>레벨</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="py-2.5" />
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
                                                <FormLabel>보여주기 순서</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="py-2.5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Use Status and Description */}
                        <Separator className="border-border dark:border-border my-6" />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium text-foreground dark:text-foreground">사용 여부</FormLabel>
                                <FormDescription className="text-sm text-muted-foreground dark:text-muted-foreground">
                                    Enable or disable this menu.
                                </FormDescription>
                            </div>
                            <FormField
                                control={form.control}
                                name="useYn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Switch
                                                className="data-[state=checked]:bg-primary"
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
                                        <FormLabel>비고</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe the purpose of this menu" {...field} className="p-3" rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Footer Buttons */}
                        <div className="px-8 py-5 bg-muted dark:bg-muted border-t border-border dark:border-border flex items-center justify-end rounded-b-xl -mx-8 -mb-8 mt-10">
                            <div className="flex gap-2">
                                {isEdit && onDelete && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => onDelete(item.menuId)}
                                    >
                                        삭제
                                    </Button>
                                )}
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                                    저장
                                </Button>
                            </div>
                        </div>

                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}
