import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDashboard,
  faGasPump,
  faChartBar,
  faUsers,
  faCog,
  faSignOutAlt,
  faBars,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Sidebar state
  readonly isSidebarOpen = signal(false);

  // Icons
  readonly faDashboard = faDashboard;
  readonly faGasPump = faGasPump;
  readonly faChartBar = faChartBar;
  readonly faUsers = faUsers;
  readonly faCog = faCog;
  readonly faSignOutAlt = faSignOutAlt;
  readonly faBars = faBars;
  readonly faTimes = faTimes;
  readonly faUser = faUser;
  public toggleSidebar(): void {
    this.isSidebarOpen.update(isOpen => !isOpen);
  }
  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  } // Current date as a simple string property
  readonly currentDate = this.getCurrentDate();

  private getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  public async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/auth']);
  }
}
