// src/app/layout/footer/footer.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  // This property will automatically provide the current year to your template.
  currentYear = new Date().getFullYear();
}
