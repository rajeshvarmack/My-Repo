import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StationData {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  fuelTypes: string[];
}

@Component({
  selector: 'app-primeng-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold text-emerald-700 mb-6">PrimeNG-Style Components with Tailwind CSS</h1>
      
      <!-- PrimeNG-inspired Card Example -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Card Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">Station Management</h3>
          <p class="text-sm text-gray-500 mt-1">Manage your petrol stations with PrimeNG-styled components</p>
        </div>
        
        <!-- Card Content -->
        <div class="p-6 space-y-4">
          <div class="flex gap-4">
            <!-- PrimeNG-style Primary Button -->
            <button class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <i class="pi pi-plus text-sm"></i>
              Add Station
            </button>
            
            <!-- PrimeNG-style Outlined Button -->
            <button class="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-600 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <i class="pi pi-download text-sm"></i>
              Export Data
            </button>
          </div>
          
          <!-- PrimeNG-style Input -->
          <div>
            <input 
              type="text"
              placeholder="Search stations..." 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none">
          </div>
        </div>
      </div>

      <!-- PrimeNG-inspired Table Example -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">Stations Overview</h3>
        </div>
        
        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Name</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Location</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Status</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Fuel Types</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr *ngFor="let station of stations" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ station.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ station.location }}</td>
                <td class="px-6 py-4">
                  <!-- PrimeNG-style Tag -->
                  <span [class]="getStatusClass(station.status)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                    {{ station.status | titlecase }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <!-- PrimeNG-style Badge -->
                  <span class="inline-flex items-center gap-2">
                    <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-emerald-500 rounded-full">
                      {{ station.fuelTypes.length }}
                    </span>
                    <span class="text-sm text-gray-600">fuel types</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Integration Notes -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="pi pi-info-circle text-blue-500"></i>
          </div>
          <div class="ml-3">
            <h4 class="text-sm font-medium text-blue-800">PrimeNG Integration Notes</h4>
            <div class="mt-2 text-sm text-blue-700">
              <ul class="list-disc list-inside space-y-1">
                <li>Components styled to match PrimeNG design patterns</li>
                <li>Uses emerald color scheme consistent with your branding</li>
                <li>Maintains Tailwind CSS utility-first approach</li>
                <li>Ready to replace with actual PrimeNG components when installed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeNGShowcaseComponent {
  readonly stations: StationData[] = [
    {
      id: '1',
      name: 'Downtown Station',
      location: 'Main Street, City Center',
      status: 'active',
      fuelTypes: ['Petrol', 'Diesel', 'Premium']
    },
    {
      id: '2',
      name: 'Highway Station',
      location: 'Highway 101, Exit 15',
      status: 'maintenance',
      fuelTypes: ['Petrol', 'Diesel']
    },
    {
      id: '3',
      name: 'Airport Station',
      location: 'Airport Road',
      status: 'active',
      fuelTypes: ['Petrol', 'Diesel', 'Premium', 'Electric']
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
