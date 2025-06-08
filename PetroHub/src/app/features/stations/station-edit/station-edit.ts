import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StationService, Station } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './station-edit.html',
  styleUrls: ['./station-edit.css'],
})
export class StationEditComponent implements OnInit {
  private stationService = inject(StationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Icons
  faSave = faSave;
  faArrowLeft = faArrowLeft;

  // State
  isLoading = signal(true);
  isSubmitting = signal(false);
  errors = signal<string[]>([]);
  station = signal<Station | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundStation = this.stationService.getStationById(id);
      if (foundStation) {
        this.station.set({ ...foundStation });
      } else {
        await this.router.navigate(['/stations']);
        return;
      }
    }
    this.isLoading.set(false);
  }

  async onSubmit(): Promise<void> {
    const currentStation = this.station();
    if (!currentStation) return;

    this.errors.set([]);

    const validationErrors = this.validateForm();
    if (validationErrors.length > 0) {
      this.errors.set(validationErrors);
      return;
    }

    this.isSubmitting.set(true);
    try {
      await this.stationService.updateStation(currentStation.id, currentStation);
      await this.router.navigate(['/stations']);
    } catch (error) {
      console.error('Error updating station:', error);
      this.errors.set(['Failed to update station. Please try again.']);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private validateForm(): string[] {
    const errors: string[] = [];
    const currentStation = this.station();

    if (!currentStation) return ['Station data is missing'];

    if (!currentStation.name.trim()) {
      errors.push('Station name is required');
    }

    if (!currentStation.address.trim()) {
      errors.push('Address is required');
    }

    if (!currentStation.city.trim()) {
      errors.push('City is required');
    }

    if (!currentStation.state.trim()) {
      errors.push('State is required');
    }

    if (!currentStation.zipCode.trim()) {
      errors.push('ZIP code is required');
    }

    if (!currentStation.phone.trim()) {
      errors.push('Phone number is required');
    }

    if (!currentStation.email.trim()) {
      errors.push('Email is required');
    }

    if (!currentStation.manager.trim()) {
      errors.push('Manager name is required');
    }

    if (currentStation.totalTanks < 1) {
      errors.push('Total tanks must be at least 1');
    }

    return errors;
  }

  goBack(): void {
    this.router.navigate(['/stations']);
  }
}
