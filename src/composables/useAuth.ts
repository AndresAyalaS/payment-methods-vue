import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';

export function useAuth() {
  const authStore = useAuthStore();
  const { user, isLoading, errorMessage } = storeToRefs(authStore);

  return { authStore, user, isLoading, errorMessage };
}
