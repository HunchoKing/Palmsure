// src/app/layout/header/header.ts

import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // UPDATED: isPlatformBrowser is needed for SSR safety
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isScrolled = false;
  isMobileMenuOpen = false;

  // UPDATED: Inject PLATFORM_ID to check if we are on the browser or server
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // SSR-SAFE: Only check for window properties if we are in a browser
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 10;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  /**
   * NEW: Centralized logic to control body scrolling.
   * This is now SSR-safe.
   */
  private updateBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : 'auto';
    }
  }
}
