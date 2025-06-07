import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
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
  template: `
    <div class="p-6 space-y-6">
      <!-- Welcome Header -->
      <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">Welcome back, {{ authService.user()?.name }}!</h1>
            <p class="text-emerald-100">Here's what's happening with your stations today.</p>
          </div>
          <button
            (click)="navigateToStationSetup()"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
          >
            <fa-icon [icon]="faPlus" class="text-sm"></fa-icon>
            Add Station
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Stations</p>
              <p class="text-3xl font-bold text-gray-900">{{ stationService.totalStations() }}</p>
              <div class="flex items-center mt-2">
                <fa-icon [icon]="faArrowUp" class="text-green-500 text-sm mr-1"></fa-icon>
                <span class="text-sm text-green-600">+12%</span>
                <span class="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div class="p-3 bg-blue-100 rounded-lg">
              <fa-icon [icon]="faGasPump" class="text-blue-600 text-2xl"></fa-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Active Stations</p>
              <p class="text-3xl font-bold text-gray-900">{{ stationService.activeStations().length }}</p>
              <div class="flex items-center mt-2">
                <fa-icon [icon]="faArrowUp" class="text-green-500 text-sm mr-1"></fa-icon>
                <span class="text-sm text-green-600">+8%</span>
                <span class="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div class="p-3 bg-green-100 rounded-lg">
              <fa-icon [icon]="faChartLine" class="text-green-600 text-2xl"></fa-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Sales</p>
              <p class="text-3xl font-bold text-gray-900">₹1.2M</p>
              <div class="flex items-center mt-2">
                <fa-icon [icon]="faArrowDown" class="text-red-500 text-sm mr-1"></fa-icon>
                <span class="text-sm text-red-600">-3%</span>
                <span class="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div class="p-3 bg-purple-100 rounded-lg">
              <fa-icon [icon]="faUsers" class="text-purple-600 text-2xl"></fa-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Coverage</p>
              <p class="text-3xl font-bold text-gray-900">5</p>
              <div class="flex items-center mt-2">
                <span class="text-sm text-gray-600">Regions covered</span>
              </div>
            </div>
            <div class="p-3 bg-orange-100 rounded-lg">
              <fa-icon [icon]="faMapMarkerAlt" class="text-orange-600 text-2xl"></fa-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Stations -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Recent Stations</h3>
              <button (click)="navigateToStations()" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div class="p-6">
            @if (stationService.stations().length > 0) {
              <div class="space-y-4">
                @for (station of stationService.stations().slice(0, 3); track station.id) {
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-blue-100 rounded-lg">
                        <fa-icon [icon]="faGasPump" class="text-blue-600"></fa-icon>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ station.name }}</p>
                        <p class="text-sm text-gray-500">{{ station.city }}, {{ station.region }}</p>
                      </div>
                    </div>
                    <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </div>
                }
              </div>
            } @else {
              <div class="text-center py-8">
                <fa-icon [icon]="faGasPump" class="text-gray-400 text-3xl mb-3"></fa-icon>
                <p class="text-gray-500">No stations configured yet</p>
                <button
                  (click)="navigateToStationSetup()"
                  class="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                >
                  Add Your First Station
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 gap-4">
              <button
                (click)="navigateToStationSetup()"
                class="flex items-center gap-4 p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div class="p-3 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors">
                  <fa-icon [icon]="faPlus" class="text-blue-600 text-xl"></fa-icon>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Add New Station</p>
                  <p class="text-sm text-gray-500">Set up a new petrol station</p>
                </div>
              </button>

              <button
                (click)="navigateToStations()"
                class="flex items-center gap-4 p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div class="p-3 bg-green-100 group-hover:bg-green-200 rounded-lg transition-colors">
                  <fa-icon [icon]="faGasPump" class="text-green-600 text-xl"></fa-icon>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Manage Stations</p>
                  <p class="text-sm text-gray-500">View and edit existing stations</p>
                </div>
              </button>

              <button
                (click)="navigateToReports()"
                class="flex items-center gap-4 p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <div class="p-3 bg-purple-100 group-hover:bg-purple-200 rounded-lg transition-colors">
                  <fa-icon [icon]="faChartLine" class="text-purple-600 text-xl"></fa-icon>
                </div>
                <div>
                  <p class="font-medium text-gray-900">View Reports</p>
                  <p class="text-sm text-gray-500">Analyze station performance</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Chart Placeholder -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Performance Overview</h3>
        </div>
        <div class="p-6">
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <fa-icon [icon]="faChartLine" class="text-gray-400 text-4xl mb-3"></fa-icon>
              <p class="text-gray-500">Performance charts will be displayed here</p>
              <p class="text-sm text-gray-400">Integration with analytics coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
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

  navigateToStationSetup(): void {
    this.router.navigate(['/stations/setup']);
  }

  navigateToStations(): void {
    this.router.navigate(['/stations']);
  }

  navigateToReports(): void {
    this.router.navigate(['/reports']);
  }
}
