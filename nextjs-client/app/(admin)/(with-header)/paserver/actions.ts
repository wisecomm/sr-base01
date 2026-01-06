"use client";

import { ApiResponse, PageResponse, UserDetail } from "@/types";
import { api } from "@/lib/axiosClient";

export async function getUsers(page: number, size: number): Promise<ApiResponse<PageResponse<UserDetail>>> {
    try {
        const response = await api.get<PageResponse<UserDetail>>(`/v1/mgmt/users?page=${page}&size=${size}`);
        return response;
    } catch (error: unknown) {
        const err = error as { response?: { data?: { code?: string; message?: string } } };
        return {
            code: err.response?.data?.code || "500",
            message: err.response?.data?.message || "Failed to fetch users",
            data: null,
        };
    }
}

export async function createUser(data: Partial<UserDetail>): Promise<ApiResponse<void>> {
    try {
        const response = await api.post<void>("/v1/mgmt/users", data);
        return response;
    } catch (error: unknown) {
        const err = error as { response?: { data?: { code?: string; message?: string } } };
        return {
            code: err.response?.data?.code || "500",
            message: err.response?.data?.message || "Failed to create user",
            data: null,
        };
    }
}

export async function updateUser(userId: string, data: Partial<UserDetail>): Promise<ApiResponse<void>> {
    try {
        const response = await api.put<void>(`/v1/mgmt/users/${userId}`, data);
        return response;
    } catch (error: unknown) {
        const err = error as { response?: { data?: { code?: string; message?: string } } };
        return {
            code: err.response?.data?.code || "500",
            message: err.response?.data?.message || "Failed to update user",
            data: null,
        };
    }
}

export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
        const response = await api.delete<void>(`/v1/mgmt/users/${userId}`);
        return response;
    } catch (error: unknown) {
        const err = error as { response?: { data?: { code?: string; message?: string } } };
        return {
            code: err.response?.data?.code || "500",
            message: err.response?.data?.message || "Failed to delete user",
            data: null,
        };
    }
}
