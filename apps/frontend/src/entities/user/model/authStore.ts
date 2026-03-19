import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@tma-game/shared-types';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  updateBalance: (balance: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      updateBalance: (balance) =>
        set((state) =>
          state.user ? { user: { ...state.user, balance } } : state
        ),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
