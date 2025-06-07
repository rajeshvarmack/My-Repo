import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faMapMarkerAlt,
  faBuilding,
  faCalendarAlt,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

import { StationService, Station } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './station-list.html',
  styleUrls: ['./station-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationListComponent {
  readonly stationService = inject(StationService);
  private readonly router = inject(Router);

  // Icons
  readonly faPlus = faPlus;
  readonly faSearch = faSearch;
  readonly faEdit = faEdit;
  readonly faTrash = faTrash;
  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faBuilding = faBuilding;
  readonly faCalendarAlt = faCalendarAlt;
  readonly faChartBar = faChartBar;

  navigateToSetup(): void {
    this.router.navigate(['/stations/setup']);
  }

  editStation(id: string): void {
    this.router.navigate(['/stations/edit', id]);
  }

  async deleteStation(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this station?')) {
      await this.stationService.deleteStation(id);
    }
  }

  getTypeClass(type: string): string {
    const classes = {
      company_owned: 'bg-emerald-100 text-emerald-800',
      dealer_owned: 'bg-green-100 text-green-800',
      coco: 'bg-purple-100 text-purple-800',
      dodo: 'bg-orange-100 text-orange-800',
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getTypeLabel(type: string): string {
    const labels = {
      company_owned: 'Company Owned',
      dealer_owned: 'Dealer Owned',
      coco: 'COCO',
      dodo: 'DODO',
    };
    return labels[type as keyof typeof labels] || type;
  }

  getSubscriptionClass(type: string): string {
    const classes = {
      basic: 'bg-gray-100 text-gray-800',
      premium: 'bg-emerald-100 text-emerald-800',
      enterprise: 'bg-purple-100 text-purple-800',
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getSubscriptionLabel(type: string): string {
    const labels = {
      basic: 'Basic',
      premium: 'Premium',
      enterprise: 'Enterprise',
    };
    return labels[type as keyof typeof labels] || type;
  }

  getStatusClass(station: Station): string {
    const isActive = station.subscriptionExpiry > new Date();
    return isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800';
  }

  getStatusLabel(station: Station): string {
    const isActive = station.subscriptionExpiry > new Date();
    return isActive ? 'Active' : 'Expired';
  }
}
