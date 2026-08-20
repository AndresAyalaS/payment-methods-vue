import { defineStore } from 'pinia';
import { loginMock } from '@/services/auth.mock';
import type { AuthUser, LoginCredentials } from '@/types/auth';

const SESSION_KEY = 'payment-methods-user';

function getStoredUser(): AuthUser | null {
  const savedUser = sessionStorage.getItem(SESSION_KEY);
  return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getStoredUser(),
    isLoading: false,
    errorMessage: '',
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        this.user = await loginMock(credentials);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(this.user));
      } catch (error) {
        this.errorMessage =
          error instanceof Error ? error.message : 'No fue posible iniciar sesion.';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.errorMessage = '';
      sessionStorage.removeItem(SESSION_KEY);
    },
  },
});
