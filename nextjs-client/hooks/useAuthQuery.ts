import { useMutation } from "@tanstack/react-query";
import { login, logout } from "@/app/actions/auth-actions";
import { useAppStore } from "@/store/useAppStore";

export function useLogin() {
    const setUser = useAppStore((state) => state.setUser);
    return useMutation({
        mutationFn: (formData: FormData) => login(formData),
        onSuccess: (res) => {
            if (res.code === "200" && res.data) {
                setUser(res.data.user);
            }
        },
    });
}

export function useLogout() {
    const clearUser = useAppStore((state) => state.clearUser);
    return useMutation({
        mutationFn: async () => logout(),
        onSuccess: () => {
            clearUser();
        },
    });
}
