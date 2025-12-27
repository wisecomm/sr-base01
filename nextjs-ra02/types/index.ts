export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T | null;
}

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    lastLoginAt: string;
}

export interface LoginData {
    token: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserInfo;
}
