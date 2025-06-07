import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Station {
  id: string;
  name: string;
  code: string;
  type: 'company_owned' | 'dealer_owned' | 'coco' | 'dodo';
  relationship: 'direct' | 'franchise' | 'joint_venture';
  branchOffice: string;
  region: string;
  city: string;
  crNumber: string;
  subscriptionType: 'basic' | 'premium' | 'enterprise';
  crExpiryDate: Date;
  subscriptionActivation: Date;
  subscriptionExpiry: Date;
  autoFuelRequest: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStationRequest {
  name: string;
  code: string;
  type: Station['type'];
  relationship: Station['relationship'];
  branchOffice: string;
  region: string;
  city: string;
  crNumber: string;
  subscriptionType: Station['subscriptionType'];
  crExpiryDate: Date;
  subscriptionActivation: Date;
  subscriptionExpiry: Date;
  autoFuelRequest: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private readonly _stations = signal<Station[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly stations = this._stations.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly totalStations = computed(() => this.stations().length);
  readonly activeStations = computed(() => this.stations().filter(station => station.subscriptionExpiry > new Date()));

  constructor(private http: HttpClient) {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Mock data for demonstration
    const mockStations: Station[] = [
      {
        id: '1',
        name: 'Central Station',
        code: 'CEN001',
        type: 'company_owned',
        relationship: 'direct',
        branchOffice: 'Mumbai Central',
        region: 'West',
        city: 'Mumbai',
        crNumber: 'CR2024001',
        subscriptionType: 'enterprise',
        crExpiryDate: new Date('2025-12-31'),
        subscriptionActivation: new Date('2024-01-01'),
        subscriptionExpiry: new Date('2025-12-31'),
        autoFuelRequest: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-01'),
      },
    ];

    this._stations.set(mockStations);
  }

  async createStation(stationData: CreateStationRequest): Promise<Station | null> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newStation: Station = {
        id: Date.now().toString(),
        ...stationData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to local state
      this._stations.update(stations => [...stations, newStation]);

      return newStation;
    } catch (error) {
      this._error.set('Failed to create station');
      console.error('Station creation error:', error);
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  async updateStation(id: string, stationData: Partial<CreateStationRequest>): Promise<Station | null> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      this._stations.update(stations =>
        stations.map(station => (station.id === id ? { ...station, ...stationData, updatedAt: new Date() } : station))
      );

      const updatedStation = this.stations().find(s => s.id === id);
      return updatedStation || null;
    } catch (error) {
      this._error.set('Failed to update station');
      console.error('Station update error:', error);
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  async deleteStation(id: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      this._stations.update(stations => stations.filter(s => s.id !== id));
      return true;
    } catch (error) {
      this._error.set('Failed to delete station');
      console.error('Station deletion error:', error);
      return false;
    } finally {
      this._loading.set(false);
    }
  }

  getStationById(id: string): Station | undefined {
    return this.stations().find(station => station.id === id);
  }

  getStationsByRegion(region: string): Station[] {
    return this.stations().filter(station => station.region === region);
  }
}
