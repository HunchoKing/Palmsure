import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [
    CommonModule // Required for [ngClass]
  ],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss'
})
export class BackToTop {

  // This property will control the visibility and animation of the button
  showButton = false;

  /**
   * Listens for the window's scroll event.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show the button if the user has scrolled more than 300px down the page
    this.showButton = window.pageYOffset > 300;
  }

  /**
   * Scrolls the window smoothly to the top of the page.
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
