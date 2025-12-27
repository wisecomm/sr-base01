import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types';

import { getAccessToken } from '@/app/actions/auth-actions';
import { handleTokenRefresh, handleUnauthorized } from './auth-utils';

// 환경 변수 설정 (클라이언트에서 /api로 요청하면 Next.js Proxy가 처리)
const baseURL = '/api';

// 1. Axios 인스턴스 생성
const axiosClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000, // 10초 타임아웃
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. 요청 인터셉터: 토큰 주입
axiosClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. 응답 인터셉터 (에러 공통 처리 및 401 대응)
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // 401: 인증 실패 (토큰 만료 등)
        if (error.response?.status === 401 && originalRequest) {
            console.error('인증 실패: 토큰이 만료되었을 수 있습니다.');

            try {
                // 토큰 갱신 시도
                const newToken = await handleTokenRefresh();

                if (newToken) {
                    // 갱신 성공 시 원래 요청 재시도
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    }
                    return axiosClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('토큰 갱신 중 에러 발생:', refreshError);
            }

            // 갱신 실패 또는 로직 부재 시 로그아웃 처리
            handleUnauthorized();
        }

        // 기타 에러 처리
        if (error.response) {
            const { status } = error.response;
            if (status === 403) console.error('권한이 없습니다.');
            if (status >= 500) console.error('서버 에러가 발생했습니다.');
        } else if (error.request) {
            console.error('서버로부터 응답이 없습니다.');
        }

        return Promise.reject(error);
    }
);

// 4. API 요청 래퍼 객체
export const api = {
    // GET 요청
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return axiosClient.get(url, config);
    },

    // POST 요청
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return axiosClient.post(url, data, config);
    },

    // PUT 요청
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return axiosClient.put(url, data, config);
    },

    // PATCH 요청
    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return axiosClient.patch(url, data, config);
    },

    // DELETE 요청
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        return axiosClient.delete(url, config);
    },
};

export default axiosClient;