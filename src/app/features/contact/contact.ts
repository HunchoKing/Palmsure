/* src/app/features/contact/contact.ts */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// REMOVED: No longer need GoogleMapsModule

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    // REMOVED: GoogleMapsModule is gone
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl(''),
    message: new FormControl('', Validators.required)
  });

  // NEW: Logic to control the active map tab
  activeMap: 'cape-town' | 'mthatha' = 'cape-town';

  selectMap(branch: 'cape-town' | 'mthatha'): void {
    this.activeMap = branch;
  }
  // REMOVED: All previous Google Maps API logic is gone

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
    }
  }
}
