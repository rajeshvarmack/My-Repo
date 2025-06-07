import { Component, signal, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Icons
  readonly faUser = faUser;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faSignInAlt = faSignInAlt;

  // Component state
  readonly isLoggingIn = signal(false);
  readonly loginError = signal<string | null>(null);
  readonly showPassword = signal(false);

  // Form fields - Signal Forms
  readonly email = signal('admin@petrohub.com');
  readonly password = signal('admin123');
  readonly rememberMe = signal(false);

  // Computed validation errors
  readonly emailError = computed(() => {
    const emailValue = this.email();
    if (!emailValue) {
      return 'Email is required';
    }
    if (!this.isValidEmail(emailValue)) {
      return 'Please enter a valid email address';
    }
    return null;
  });

  readonly passwordError = computed(() => {
    const passwordValue = this.password();
    if (!passwordValue) {
      return 'Password is required';
    }
    return null;
  });

  readonly isFormValid = computed(() => {
    return !this.emailError() && !this.passwordError();
  });

  public async onLogin(): Promise<void> {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoggingIn.set(true);
    this.loginError.set(null);

    try {
      const emailValue = this.email();
      const passwordValue = this.password();
      const success = await this.authService.login(emailValue, passwordValue);

      if (success) {
        // Redirect to dashboard or return URL
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/dashboard';
        await this.router.navigate([returnUrl]);
      } else {
        this.loginError.set('Invalid email or password. Please try again.');
      }
    } catch {
      this.loginError.set('An error occurred during login. Please try again.');
      // Note: In production, consider using a proper logging service instead of console
    } finally {
      this.isLoggingIn.set(false);
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword.update((show: boolean) => !show);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
