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
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayoutComponent {
  // Font Awesome icons
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

  // Services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Sidebar state signals
  readonly isSidebarMinimized = signal(false);
  readonly isMobileSidebarOpen = signal(false);
  readonly isHovered = signal(false);

  // Auth state
  readonly user = this.authService.user;
  readonly userRole = this.authService.userRole;
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly hasAdminRole = this.authService.hasAdminRole;

  // Computed text visibility
  readonly shouldShowText = computed(() => {
    return !this.isSidebarMinimized() || this.isHovered();
  });

  // Computed sidebar classes
  readonly sidebarClasses = computed(() => {
    const baseClasses =
      'fixed inset-y-0 left-0 z-50 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 transition-all duration-300 ease-in-out';
    const isMinimized = this.isSidebarMinimized();
    const isHovered = this.isHovered();
    const isMobileOpen = this.isMobileSidebarOpen();

    // Mobile classes - show/hide sidebar on mobile
    const mobileClasses = isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0';

    // Desktop width classes - hover expansion when minimized
    const widthClasses = isMinimized && !isHovered ? 'w-64 lg:w-16' : 'w-64';

    return `${baseClasses} ${mobileClasses} ${widthClasses}`;
  });

  constructor() {
    // Load sidebar state from localStorage
    const savedState = localStorage.getItem('sidebar-minimized');
    if (savedState) {
      this.isSidebarMinimized.set(JSON.parse(savedState));
    }
  }

  // Sidebar control methods
  public toggleSidebarMinimized(): void {
    const currentState = this.isSidebarMinimized();
    const newState = !currentState;
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
    // Prevent any unwanted sidebar interactions when clicking on main content
  }

  // Navigation methods
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Check if route is active
  public isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
