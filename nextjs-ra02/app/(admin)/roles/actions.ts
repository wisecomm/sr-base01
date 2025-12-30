"use client";

import { api } from "@/lib/axiosClient";
import { ApiResponse, PageResponse, RoleInfo } from "@/types";

const API_BASE_URL = "/v1/mgmt/roles";

export async function getRoles(page: number, size: number): Promise<ApiResponse<PageResponse<RoleInfo>>> {
    try {
        const response = await api.get<RoleInfo[]>(API_BASE_URL);

        // Backend returns a flat list for roles. We adapt it to a PageResponse structure
        // to stay consistent with the DataTable's expectation of paginated data.
        const allRoles = response.data || [];
        const total = allRoles.length;
        const start = page * size;
        const end = start + size;
        const pagedList = allRoles.slice(start, end);

        return {
            code: "200",
            message: "Success",
            data: {
                list: pagedList,
                total: total,
                pageNum: page + 1,
                pageSize: size,
                pages: Math.ceil(total / size)
            }
        };
    } catch (error: any) {
        console.error("getRoles error:", error);
        return {
            code: "500",
            message: error.response?.data?.message || "Internal Server Error",
            data: null
        };
    }
}

export async function createRole(data: Partial<RoleInfo>): Promise<ApiResponse<void>> {
    try {
        const response = await api.post<void>(API_BASE_URL, data);
        return response;
    } catch (error: any) {
        return {
            code: "500",
            message: error.response?.data?.message || "Failed to create role",
            data: null
        };
    }
}

export async function updateRole(roleId: string, data: Partial<RoleInfo>): Promise<ApiResponse<void>> {
    try {
        const response = await api.put<void>(`${API_BASE_URL}/${roleId}`, data);
        return response;
    } catch (error: any) {
        return {
            code: "500",
            message: error.response?.data?.message || "Failed to update role",
            data: null
        };
    }
}

export async function deleteRole(roleId: string): Promise<ApiResponse<void>> {
    try {
        const response = await api.delete<void>(`${API_BASE_URL}/${roleId}`);
        return response;
    } catch (error: any) {
        return {
            code: "500",
            message: error.response?.data?.message || "Failed to delete role",
            data: null
        };
    }
}
