export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T | null;
}

export interface PageResponse<T> {
    list: T[];
    total: number;
    pageNum: number;
    pageSize: number;
    pages: number;
}

export interface UserDetail {
    userId: string;
    userEmail: string;
    userMobile: string;
    userName: string;
    userNick: string;
    userMsg?: string;
    userDesc?: string;
    userStatCd: string;
    userSnsid?: string;
    useYn: string;
    sysInsertDtm?: string;
    sysUpdateDtm?: string;
}

export interface UserInfo {
    userId: string;
    userName: string;
    userEmail: string;
    userRole: string;
    createdAt?: string;
    lastLoginAt?: string;
}

export interface LoginData {
    token: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserInfo;
}

export interface MenuInfo {
    menuId: string;
    menuLvl: number;
    menuUri?: string | null;
    menuName: string;
    upperMenuId?: string | null;
    menuDesc?: string | null;
    menuSeq?: number | null;
    leftMenuYn: string;
    useYn: string;
    adminMenuYn: string;
    menuHelpUri?: string | null;
    menuScript?: string | null;
    personalDataYn: string;
    sysInsertDtm?: string;
    sysUpdateDtm?: string;
}
