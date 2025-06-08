import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEdit,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { StationService, Station } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './station-detail.html',
  styleUrls: ['./station-detail.css'],
})
export class StationDetailComponent implements OnInit {
  private stationService = inject(StationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Icons
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faClock = faClock;
  faUser = faUser;

  // State
  isLoading = signal(true);
  station = signal<Station | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundStation = this.stationService.getStationById(id);
      if (foundStation) {
        this.station.set(foundStation);
      } else {
        await this.router.navigate(['/stations']);
        return;
      }
    }
    this.isLoading.set(false);
  }

  goBack(): void {
    this.router.navigate(['/stations']);
  }

  editStation(): void {
    const currentStation = this.station();
    if (currentStation) {
      this.router.navigate(['/stations/edit', currentStation.id]);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }
}
