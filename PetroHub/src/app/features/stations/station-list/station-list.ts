import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faEye, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { StationService } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './station-list.html',
  styleUrls: ['./station-list.css'],
})
export class StationListComponent {
  private stationService = inject(StationService);

  // Icons
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  faMapMarkerAlt = faMapMarkerAlt;

  // Signals
  searchTerm = signal('');
  selectedStatus = signal<string>('all');

  // Computed properties
  stations = computed(() => this.stationService.stations());
  filteredStations = computed(() => {
    const stations = this.stations();
    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();

    return stations.filter(station => {
      const matchesSearch =
        station.name.toLowerCase().includes(search) ||
        station.address.toLowerCase().includes(search) ||
        station.city.toLowerCase().includes(search);
      const matchesStatus = status === 'all' || station.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus.set(target.value);
  }

  async deleteStation(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this station?')) {
      await this.stationService.deleteStation(id);
    }
  }
}
