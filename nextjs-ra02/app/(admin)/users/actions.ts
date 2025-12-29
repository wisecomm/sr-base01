"use client";

import { api } from "@/lib/axiosClient";
import { ApiResponse, PageResponse, UserDetail } from "@/types";

/**
 * 사용자 목록 조회 (페이징)
 */
export async function getUsers(page: number, size: number): Promise<ApiResponse<PageResponse<UserDetail>>> {
    try {
        const response = await api.get<PageResponse<UserDetail>>(`/v1/mgmt/users?page=${page + 1}&size=${size}`);
        return response;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return {
            code: "500",
            message: "사용자 목록을 가져오는 데 실패했습니다.",
            data: null,
        };
    }
}

/**
 * 사용자 생성
 */
export async function createUser(data: Partial<UserDetail>): Promise<ApiResponse<void>> {
    try {
        const response = await api.post<void>("/v1/mgmt/users", data);
        return response;
    } catch (error) {
        console.error("Failed to create user:", error);
        return {
            code: "500",
            message: "사용자 생성에 실패했습니다.",
            data: null,
        };
    }
}

/**
 * 사용자 수정
 */
export async function updateUser(userId: string, data: Partial<UserDetail>): Promise<ApiResponse<void>> {
    try {
        const response = await api.put<void>(`/v1/mgmt/users/${userId}`, data);
        return response;
    } catch (error) {
        console.error("Failed to update user:", error);
        return {
            code: "500",
            message: "사용자 수정에 실패했습니다.",
            data: null,
        };
    }
}

/**
 * 사용자 삭제
 */
export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
        const response = await api.delete<void>(`/v1/mgmt/users/${userId}`);
        return response;
    } catch (error) {
        console.error("Failed to delete user:", error);
        return {
            code: "500",
            message: "사용자 삭제에 실패했습니다.",
            data: null,
        };
    }
}
