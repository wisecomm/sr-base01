import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, deleteUser, getUserRoles, assignUserRoles } from "@/app/(admin)/users/actions";
import { UserDetail } from "@/types";

export const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (page: number, size: number) => [...userKeys.lists(), { page, size }] as const,
    detail: (id: string) => [...userKeys.all, "detail", id] as const,
    roles: (id: string) => [...userKeys.detail(id), "roles"] as const,
};

export function useUsers(page: number, size: number) {
    return useQuery({
        queryKey: userKeys.list(page, size),
        queryFn: async () => {
            const res = await getUsers(page, size);
            if (res.code !== "200") throw new Error(res.message);
            return res.data;
        },
        placeholderData: (previousData) => previousData, // Keep data while fetching new page
    });
}

export function useUserRoles(userId: string | undefined) {
    return useQuery({
        queryKey: userKeys.roles(userId || ""),
        queryFn: async () => {
            const res = await getUserRoles(userId!);
            if (res.code !== "200") throw new Error(res.message);
            return res.data || [];
        },
        enabled: !!userId,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<UserDetail>) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<UserDetail> }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}

export function useAssignUserRoles() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, roleIds }: { userId: string; roleIds: string[] }) => assignUserRoles(userId, roleIds),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.roles(variables.userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}
