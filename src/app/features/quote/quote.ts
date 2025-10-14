/* src/app/features/quote/quote.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface InsuranceType {
  id: string;
  name: string;
  description: string;
  icon: string; // Added icon property
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote implements OnInit {
  // Step Management
  currentStep: number = 1;

  // Data for Step 1 - Now includes icons
  insuranceTypes: InsuranceType[] = [
    { id: 'property', name: 'Property', description: 'Home and personal belongings.', icon: 'home_work' },
    { id: 'vehicle', name: 'Vehicle', description: 'Personal or commercial vehicles.', icon: 'directions_car' },
    { id: 'business', name: 'Business', description: 'Assets, liability, and operations.', icon: 'business_center' }
  ];
  selectedInsuranceType: string | null = null;

  // Forms for each step
  personalDetailsForm!: FormGroup;
  propertyDetailsForm!: FormGroup;
  vehicleDetailsForm!: FormGroup;
  businessDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Step 2 Form
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9-+\\s()]*$')]]
    });

    // Step 3 Forms (Context-Specific)
    this.propertyDetailsForm = this.fb.group({
      propertyAddress: ['', Validators.required],
      propertyValue: ['', [Validators.required, Validators.min(50000)]]
    });
    this.vehicleDetailsForm = this.fb.group({
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleYear: ['', [Validators.required, Validators.min(1980), Validators.max(new Date().getFullYear() + 1)]]
    });
    this.businessDetailsForm = this.fb.group({
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      numEmployees: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // == REFACTORED: Dedicated getters for type-safe template access ==
  get p() { return this.personalDetailsForm.controls; }
  get prop() { return this.propertyDetailsForm.controls; }
  get veh() { return this.vehicleDetailsForm.controls; }
  get biz() { return this.businessDetailsForm.controls; }

  selectInsuranceType(typeId: string): void {
    this.selectedInsuranceType = typeId;
  }

  goToNextStep(): void {
    if (this.currentStep === 1 && this.selectedInsuranceType) {
      this.currentStep++;
    } else if (this.currentStep === 2) {
      if (this.personalDetailsForm.invalid) {
        this.personalDetailsForm.markAllAsTouched();
        return;
      }
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitQuote(): void {
    const specificsFormMap: { [key: string]: FormGroup } = {
      property: this.propertyDetailsForm,
      vehicle: this.vehicleDetailsForm,
      business: this.businessDetailsForm
    };
    const specifics = this.selectedInsuranceType ? specificsFormMap[this.selectedInsuranceType] : null;

    if (!specifics || specifics.invalid) {
      specifics?.markAllAsTouched();
      return;
    }

    console.log('--- QUOTE SUBMISSION ---');
    console.log('INSURANCE TYPE:', this.selectedInsuranceType);
    console.log('PERSONAL DETAILS:', this.personalDetailsForm.value);
    console.log('SPECIFIC DETAILS:', specifics.value);

    this.currentStep = 4; // Advance to success view
  }
}
