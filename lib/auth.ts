import { User } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from '@/lib/utils';

class AuthStore {
  private token: string | null = null;
  private user: User | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = getFromLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
      this.user = getFromLocalStorage<User>(STORAGE_KEYS.USER);
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, refreshToken, user } = response;
      this.setAuth(token, refreshToken, user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async signup(data: any) {
    try {
      const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.SIGNUP, data);
      const { token, refreshToken, user } = response;
      this.setAuth(token, refreshToken, user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  private setAuth(token: string, refreshToken: string, user: User) {
    this.token = token;
    this.user = user;

    setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
    setToLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    setToLocalStorage(STORAGE_KEYS.USER, user);

    this.notifyListeners();
  }

  private clearAuth() {
    this.token = null;
    this.user = null;

    removeFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeFromLocalStorage(STORAGE_KEYS.REFRESH_TOKEN);
    removeFromLocalStorage(STORAGE_KEYS.USER);

    this.notifyListeners();
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const authStore = new AuthStore();
export default authStore;
