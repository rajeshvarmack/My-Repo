import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGasPump,
  faChartLine,
  faUsers,
  faMapMarkerAlt,
  faArrowUp,
  faArrowDown,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { StationService } from '../../core/services/station-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly stationService = inject(StationService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Icons
  readonly faGasPump = faGasPump;
  readonly faChartLine = faChartLine;
  readonly faUsers = faUsers;
  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faArrowUp = faArrowUp;
  readonly faArrowDown = faArrowDown;
  readonly faPlus = faPlus;
  public navigateToStationSetup(): void {
    this.router.navigate(['/stations/setup']);
  }

  public navigateToStations(): void {
    this.router.navigate(['/stations']);
  }

  public navigateToReports(): void {
    this.router.navigate(['/reports']);
  }
}
