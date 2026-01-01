import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, createRole, updateRole, deleteRole, getRoleMenus, assignRoleMenus } from "@/app/(admin)/roles/actions";
import { RoleInfo } from "@/types";

export const roleKeys = {
    all: ["roles"] as const,
    lists: () => [...roleKeys.all, "list"] as const,
    list: (page: number, size: number) => [...roleKeys.lists(), { page, size }] as const,
    detail: (id: string) => [...roleKeys.all, "detail", id] as const,
    menus: (id: string) => [...roleKeys.detail(id), "menus"] as const,
};

export function useRoles(page: number, size: number) {
    return useQuery({
        queryKey: roleKeys.list(page, size),
        queryFn: async () => {
            const res = await getRoles(page, size);
            if (res.code !== "200") throw new Error(res.message);
            return res.data;
        },
        placeholderData: (previousData) => previousData,
    });
}

export function useRoleMenus(roleId: string | undefined) {
    return useQuery({
        queryKey: roleKeys.menus(roleId || ""),
        queryFn: async () => {
            const res = await getRoleMenus(roleId!);
            if (res.code !== "200") throw new Error(res.message);
            return res.data || [];
        },
        enabled: !!roleId,
    });
}

export function useCreateRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<RoleInfo>) => createRole(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.all });
        },
    });
}

export function useUpdateRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<RoleInfo> }) => updateRole(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.all });
        },
    });
}

export function useDeleteRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.all });
        },
    });
}

export function useAssignRoleMenus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ roleId, menuIds }: { roleId: string; menuIds: string[] }) => assignRoleMenus(roleId, menuIds),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: roleKeys.menus(variables.roleId) });
            queryClient.invalidateQueries({ queryKey: roleKeys.all });
        },
    });
}
