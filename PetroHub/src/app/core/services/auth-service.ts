import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'operator';
  stationId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<User | null>(null);
  private readonly _isAuthenticated = signal(false);
  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly userRole = computed(() => this.user()?.role);
  readonly hasAdminRole = computed(() => this.user()?.role === 'admin');
  readonly hasManagerRole = computed(() => this.user()?.role === 'admin' || this.user()?.role === 'manager');

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'admin',
      };

      this._user.set(mockUser);
      this._isAuthenticated.set(true);

      // Store token in localStorage
      localStorage.setItem('auth_token', 'mock_token_12345');

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  logout(): void {
    this._user.set(null);
    this._isAuthenticated.set(false);
    localStorage.removeItem('auth_token');
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Mock user restoration
      const mockUser: User = {
        id: '1',
        email: 'admin@petrohub.com',
        name: 'John Doe',
        role: 'admin',
      };

      this._user.set(mockUser);
      this._isAuthenticated.set(true);
    }
  }
}
