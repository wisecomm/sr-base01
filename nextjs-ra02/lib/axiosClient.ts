import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types';

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

// 2. 요청 인터셉터 (토큰 로직 제거 - Proxy에서 처리)
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. 응답 인터셉터 (에러 공통 처리)
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // 응답 데이터만 반환
        return response.data;
    },
    (error: AxiosError) => {
        // 공통 에러 처리 로직
        if (error.response) {
            const { status } = error.response;

            // 401: 인증 실패
            if (status === 401) {
                console.error('인증 실패: 로그인이 필요합니다.');
                // 필요 시 리다이렉트 또는 로그아웃 처리 로직 추가
                // if (typeof window !== 'undefined') window.location.href = '/login';
            }

            // 403: 권한 없음
            if (status === 403) {
                console.error('권한이 없습니다.');
            }

            // 500: 서버 에러
            if (status >= 500) {
                console.error('서버 에러가 발생했습니다.');
            }
        } else if (error.request) {
            // 요청은 보냈으나 응답을 받지 못한 경우
            console.error('서버로부터 응답이 없습니다.');
        } else {
            // 요청 설정 중에 에러가 발생한 경우
            console.error('요청 설정 중 에러 발생:', error.message);
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