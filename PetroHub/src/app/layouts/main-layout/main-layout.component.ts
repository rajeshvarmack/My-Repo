import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faGasPump,
  faChartLine,
  faChartBar,
  faUsers,
  faCog,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faUser,
  faBell,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  // Public signals for sidebar state
  readonly isSidebarMinimized = signal(false);
  readonly isHovered = signal(false);
  readonly isMobileSidebarOpen = signal(false);

  // FontAwesome icons
  faHome = faHome;
  faGasPump = faGasPump;
  faChartLine = faChartLine;
  faChartBar = faChartBar;
  faUsers = faUsers;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faBars = faBars;
  faTimes = faTimes;
  faUser = faUser;
  faBell = faBell;
  faSearch = faSearch;

  // Computed properties
  readonly shouldShowText = computed(() => !this.isSidebarMinimized() || this.isHovered());

  readonly sidebarClasses = computed(() => {
    const isMinimized = this.isSidebarMinimized();
    const isHovered = this.isHovered();

    return {
      'w-64': !isMinimized || isHovered,
      'w-16': isMinimized && !isHovered,
      'sidebar-expanded': !isMinimized || isHovered,
      'sidebar-minimized': isMinimized && !isHovered,
    };
  });

  constructor() {
    // Load sidebar state from localStorage
    const savedState = localStorage.getItem('sidebar-minimized');
    if (savedState) {
      this.isSidebarMinimized.set(JSON.parse(savedState));
    }
  }

  public toggleSidebarMinimized(): void {
    const newState = !this.isSidebarMinimized();
    this.isSidebarMinimized.set(newState);
    localStorage.setItem('sidebar-minimized', JSON.stringify(newState));
  }

  public toggleMobileSidebar(): void {
    this.isMobileSidebarOpen.set(!this.isMobileSidebarOpen());
  }

  public closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  public onSidebarMouseEnter(): void {
    this.isHovered.set(true);
  }

  public onSidebarMouseLeave(): void {
    this.isHovered.set(false);
  }
  public onMainContentClick(): void {
    // Main content clicked - can be used for analytics or other features
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  public isRouteActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
