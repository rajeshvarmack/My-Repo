import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faMapMarkerAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { StationService, StationSetupRequest } from '../../../core/services/station-service';

@Component({
  selector: 'app-station-setup',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FontAwesomeModule, FormsModule],
  templateUrl: './station-setup.html',
  styleUrl: './station-setup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationSetupComponent {
  private readonly stationService = inject(StationService);
  private readonly router = inject(Router);

  // Icons
  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faTimes = faTimes;
  readonly faCheck = faCheck;

  // Form state signals
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  // Form field signals for Signal Forms approach
  readonly name = signal('');
  readonly code = signal('');
  readonly type = signal('');
  readonly relationship = signal('');
  readonly branchOffice = signal('');
  readonly region = signal('');
  readonly city = signal('');
  readonly crNumber = signal('');
  readonly subscriptionType = signal('');
  readonly crExpiryDate = signal('');
  readonly subscriptionActivation = signal('');
  readonly subscriptionExpiry = signal('');
  readonly autoFuelRequest = signal(false);

  // Validation errors signals
  readonly nameError = computed(() => this.validateRequired(this.name(), 'Station Name'));
  readonly codeError = computed(() => this.validateStationCode(this.code()));
  readonly typeError = computed(() => this.validateRequired(this.type(), 'Station Type'));
  readonly relationshipError = computed(() => this.validateRequired(this.relationship(), 'Station Relationship'));
  readonly branchOfficeError = computed(() => this.validateRequired(this.branchOffice(), 'Branch Office'));
  readonly regionError = computed(() => this.validateRequired(this.region(), 'Region'));
  readonly cityError = computed(() => this.validateRequired(this.city(), 'City'));
  readonly crNumberError = computed(() => this.validateCrNumber(this.crNumber()));
  readonly subscriptionTypeError = computed(() => this.validateRequired(this.subscriptionType(), 'Subscription Type'));
  readonly crExpiryDateError = computed(() => this.validateRequired(this.crExpiryDate(), 'CR Expiry Date'));
  readonly subscriptionActivationError = computed(() =>
    this.validateRequired(this.subscriptionActivation(), 'Subscription Activation')
  );
  readonly subscriptionExpiryError = computed(() =>
    this.validateRequired(this.subscriptionExpiry(), 'Subscription Expiry')
  );

  // Form validity computed
  readonly isFormValid = computed(
    () =>
      !this.nameError() &&
      !this.codeError() &&
      !this.typeError() &&
      !this.relationshipError() &&
      !this.branchOfficeError() &&
      !this.regionError() &&
      !this.cityError() &&
      !this.crNumberError() &&
      !this.subscriptionTypeError() &&
      !this.crExpiryDateError() &&
      !this.subscriptionActivationError() &&
      !this.subscriptionExpiryError()
  );
  // Form errors summary
  readonly formErrors = computed(() => {
    const errors: string[] = [];
    const allErrors = [
      this.nameError(),
      this.codeError(),
      this.typeError(),
      this.relationshipError(),
      this.branchOfficeError(),
      this.regionError(),
      this.cityError(),
      this.crNumberError(),
      this.subscriptionTypeError(),
      this.crExpiryDateError(),
      this.subscriptionActivationError(),
      this.subscriptionExpiryError(),
    ];
    allErrors.forEach(error => {
      if (error) {
        errors.push(error);
      }
    });
    return errors;
  });

  // Select options
  readonly stationTypes = [
    { value: 'company_owned', label: 'Company Owned' },
    { value: 'dealer_owned', label: 'Dealer Owned' },
    { value: 'coco', label: 'COCO (Company Owned Company Operated)' },
    { value: 'dodo', label: 'DODO (Dealer Owned Dealer Operated)' },
  ];

  readonly relationshipTypes = [
    { value: 'direct', label: 'Direct' },
    { value: 'franchise', label: 'Franchise' },
    { value: 'joint_venture', label: 'Joint Venture' },
  ];

  readonly branchOffices = [
    { value: 'mumbai_central', label: 'Mumbai Central' },
    { value: 'delhi_north', label: 'Delhi North' },
    { value: 'bangalore_south', label: 'Bangalore South' },
    { value: 'chennai_east', label: 'Chennai East' },
    { value: 'kolkata_west', label: 'Kolkata West' },
  ];

  readonly regions = [
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
    { value: 'central', label: 'Central' },
  ];

  readonly cities = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
  ];
  readonly subscriptionTypes = [
    { value: 'basic', label: 'Basic' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  // Validation methods for Signal Forms
  private validateRequired(value: string, fieldName: string): string | null {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  }

  private validateStationCode(value: string): string | null {
    if (!value || value.trim() === '') {
      return 'Station Code is required';
    }
    if (!/^[A-Z]{3}\d{3}$/.test(value)) {
      return 'Station code must be in format ABC123 (3 letters + 3 numbers)';
    }
    return null;
  }

  private validateCrNumber(value: string): string | null {
    if (!value || value.trim() === '') {
      return null; // CR Number is optional
    }
    if (!/^CR\d{7}$/.test(value)) {
      return 'CR Number must be in format CR1234567 (CR + 7 digits)';
    }
    return null;
  }
  public async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    try {
      const stationData: StationSetupRequest = {
        name: this.name(),
        code: this.code(),
        type: this.type() as 'company_owned' | 'dealer_owned' | 'coco' | 'dodo',
        relationship: this.relationship() as 'direct' | 'franchise' | 'joint_venture',
        branchOffice: this.branchOffice(),
        region: this.region(),
        city: this.city(),
        crNumber: this.crNumber(),
        subscriptionType: this.subscriptionType() as 'basic' | 'premium' | 'enterprise',
        crExpiryDate: new Date(this.crExpiryDate()),
        subscriptionActivation: new Date(this.subscriptionActivation()),
        subscriptionExpiry: new Date(this.subscriptionExpiry()),
        autoFuelRequest: this.autoFuelRequest(),
      };
      const result = await this.stationService.setupStation(stationData);
      if (result) {
        // Success - navigate to stations list
        await this.router.navigate(['/stations']);
      } else {
        this.submitError.set('Failed to setup station. Please try again.');
      }
    } catch {
      this.submitError.set('An error occurred while creating the station.');
      // Note: In production, consider using a proper logging service
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public onCancel(): void {
    this.router.navigate(['/stations']);
  }
}
