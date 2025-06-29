import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Role {
  id: number;
  name: string;
}

interface AuthStore {
  loading: boolean;
  id: number;
  name: string;
  email: string;
  roles: Role[];
  checkAuth: () => void;
  logout: () => void;
  setAuthData: (data: { id: number; name: string; email: string; roles: Role[] }) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      loading: false,
      id: -1,
      name: '',
      email: '',
      roles: [],
      checkAuth: () => {
        set({ loading: true });
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          try {
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            const isValidToken = decodedToken?.exp * 1000 > Date.now();

            if (!isValidToken) {
              get().logout();
            } else {
              set({
                id: decodedToken.sub,
                name: decodedToken.name,
                email: decodedToken.email,
                roles: decodedToken.roles || [],
              });
            }
          } catch {
            get().logout();
          }
        }
        set({ loading: false });
      },
      logout: () => {
        localStorage.clear();
        set({ id: -1, name: '', email: '', roles: [], loading: false });
      },
      setAuthData: ({ id, name, email, roles }) => {
        set({ id, name, email, roles });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        id: state.id,
        name: state.name,
        email: state.email,
        roles: state.roles,
      }),
    }
  )
);
