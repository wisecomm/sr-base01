import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenus, getMyMenus, createMenu, updateMenu, deleteMenu } from "@/app/(admin)/menus/actions";
import { MenuInfo } from "@/types";

export const menuKeys = {
    all: ["menus"] as const,
    lists: () => [...menuKeys.all, "list"] as const,
    my: () => [...menuKeys.all, "my"] as const,
    detail: (id: string) => [...menuKeys.all, "detail", id] as const,
};

export function useMyMenus() {
    return useQuery({
        queryKey: menuKeys.my(),
        queryFn: async () => {
            const res = await getMyMenus();
            if (res.code !== "200") throw new Error(res.message);
            return res.data || [];
        },
    });
}

export function useMenus() {
    return useQuery({
        queryKey: menuKeys.lists(),
        queryFn: async () => {
            const res = await getMenus();
            if (res.code !== "200") throw new Error(res.message);
            return res.data || [];
        },
    });
}

export function useCreateMenu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<MenuInfo>) => createMenu(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}

export function useUpdateMenu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<MenuInfo> }) => updateMenu(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}

export function useDeleteMenu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteMenu(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}
