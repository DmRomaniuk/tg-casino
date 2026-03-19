import { useMutation } from '@tanstack/react-query';
import { authenticate } from '../api/auth.api';
import { AuthResponse } from '../api/auth.types';
import { useAuthStore } from '../../../entities/user/model/authStore';

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authenticate,
    onSuccess: (data: AuthResponse) => {
      setAuth(data.token, data.user);
    },
  });
};
