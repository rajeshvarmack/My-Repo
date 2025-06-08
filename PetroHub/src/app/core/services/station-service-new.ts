import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  region: string;
  zipCode: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'maintenance';
  totalTanks: number;
  operatingHours: string;
  manager: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CreateStationRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  region: string;
  zipCode: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'maintenance';
  totalTanks: number;
  operatingHours: string;
  manager: string;
}

export interface StationSetupRequest {
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
}

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private readonly http = inject(HttpClient);
  private readonly _stations = signal<Station[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly stations = this._stations.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed properties
  readonly stationsCount = computed(() => this.stations().length);

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockStations: Station[] = [
      {
        id: '1',
        name: 'Central Station',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        region: 'Western India',
        zipCode: '400001',
        phone: '+91-22-1234-5678',
        email: 'central@petrohub.com',
        status: 'active',
        totalTanks: 8,
        operatingHours: '24/7',
        manager: 'Rajesh Kumar',
        coordinates: {
          lat: 19.076,
          lng: 72.8777,
        },
      },
      {
        id: '2',
        name: 'East Side Station',
        address: '456 Park Avenue',
        city: 'Delhi',
        state: 'Delhi',
        region: 'Northern India',
        zipCode: '110001',
        phone: '+91-11-2345-6789',
        email: 'eastside@petrohub.com',
        status: 'active',
        totalTanks: 6,
        operatingHours: '6:00 AM - 10:00 PM',
        manager: 'Priya Sharma',
        coordinates: {
          lat: 28.7041,
          lng: 77.1025,
        },
      },
      {
        id: '3',
        name: 'Highway Junction',
        address: '789 Highway 101',
        city: 'Bangalore',
        state: 'Karnataka',
        region: 'Southern India',
        zipCode: '560001',
        phone: '+91-80-3456-7890',
        email: 'highway@petrohub.com',
        status: 'maintenance',
        totalTanks: 10,
        operatingHours: '24/7',
        manager: 'Amit Patel',
        coordinates: {
          lat: 12.9716,
          lng: 77.5946,
        },
      },
    ];

    this._stations.set(mockStations);
  }

  public async createStation(stationData: CreateStationRequest): Promise<Station | null> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newStation: Station = {
        id: Date.now().toString(),
        ...stationData,
      };

      this._stations.update(stations => [...stations, newStation]);
      return newStation;
    } catch (error) {
      console.error('Failed to create station:', error);
      this._error.set('Failed to create station. Please try again.');
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  public async setupStation(setupData: StationSetupRequest): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful setup
      console.log('Station setup data:', setupData);
      return true;
    } catch (error) {
      console.error('Failed to setup station:', error);
      this._error.set('Failed to setup station. Please try again.');
      return false;
    } finally {
      this._loading.set(false);
    }
  }

  public async updateStation(id: string, stationData: Partial<Station>): Promise<Station | null> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedStation = { ...this.getStationById(id), ...stationData };
      this._stations.update(stations =>
        stations.map(station => (station.id === id ? (updatedStation as Station) : station))
      );

      return updatedStation as Station;
    } catch (error) {
      console.error('Failed to update station:', error);
      this._error.set('Failed to update station. Please try again.');
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  public async deleteStation(id: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      this._stations.update(stations => stations.filter(station => station.id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete station:', error);
      this._error.set('Failed to delete station. Please try again.');
      return false;
    } finally {
      this._loading.set(false);
    }
  }

  public getStationById(id: string): Station | undefined {
    return this.stations().find(station => station.id === id);
  }
}

function inject(token: any): any {
  return new token();
}
