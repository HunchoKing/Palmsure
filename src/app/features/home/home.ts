// src/app/features/home/home.ts

import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';

// NEW: Define a type for our partners for clean code
type Partner = {
  name: string;
  praise: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit, OnDestroy {
  // --- Element References ---
  @ViewChild('claimsChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;
  @ViewChildren('featureCard', { read: ElementRef }) featureCards!: QueryList<ElementRef<HTMLElement>>;

  // --- NEW: State for Credibility Bar Animation ---
  partners: Partner[] = [
    { name: 'VUM Insurance', praise: 'Rated #1 by VUM Insurance' },
    { name: 'Momentum', praise: 'A Trusted Momentum Partner' },
    { name: 'SA Taxi', praise: 'Proudly Partnered with SA Taxi' },
    { name: 'Auto & General', praise: 'In Association with Auto & General' },
  ];
  currentPartnerPraise = this.partners[0].praise;
  credibilityTextState: 'visible' | 'hidden' = 'visible';
  private partnerInterval: any;
  private currentPartnerIndex = 0;

  // --- Chart & Observer Properties ---
  private claimsChart: Chart | undefined;
  private statsObserver: IntersectionObserver | undefined;
  private featuresObserver: IntersectionObserver | undefined;
  private primaryColor = '#1A5A4A'; // Brand Green
  private primaryColorTransparent = 'rgba(26, 90, 74, 0.2)';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeStatsObserver();
      this.initializeFeaturesObserver();
      this.startPartnerAnimation();
    }
  }

  private initializeStatsObserver(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.4 };
    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.createClaimsChart();
          this.statsObserver?.unobserve(entry.target);
        }
      });
    }, options);
    this.statsObserver.observe(this.statsSection.nativeElement);
  }

  private initializeFeaturesObserver(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.2 };
    this.featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.featuresObserver?.unobserve(entry.target);
        }
      });
    });
    this.featureCards.forEach(card => this.featuresObserver?.observe(card.nativeElement));
  }

  private startPartnerAnimation(): void {
    this.partnerInterval = setInterval(() => {
      this.credibilityTextState = 'hidden';

      setTimeout(() => {
        this.currentPartnerIndex = (this.currentPartnerIndex + 1) % this.partners.length;
        this.currentPartnerPraise = this.partners[this.currentPartnerIndex].praise;
        this.credibilityTextState = 'visible';
      }, 500);
    }, 4000);
  }

  private createClaimsChart(): void {
    if (!this.chartCanvas || this.claimsChart) return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, this.primaryColorTransparent);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    const data = {
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Claims Approval Rate',
        data: [92.5, 93.1, 93.8, 94.2, 94.5, 95.1, 95.8, 96.2, 96.5, 96.8, 97.2, 97.5],
        fill: true, backgroundColor: gradient, borderColor: this.primaryColor, tension: 0.4, borderWidth: 3, pointRadius: 0,
        pointBackgroundColor: this.primaryColor, pointBorderColor: '#FFFFFF', pointHoverRadius: 6, pointHoverBorderWidth: 2,
      }]
    };
    this.claimsChart = new Chart(ctx, {
      type: 'line', data: data,
      options: {
        animation: { duration: 1500, easing: 'easeInOutQuart' },
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true, backgroundColor: this.primaryColor, titleFont: { size: 12, weight: 'bold' }, bodyFont: { size: 14, weight: 'normal' },
            padding: 12, cornerRadius: 4, displayColors: false,
            callbacks: { label: (context) => `Approval Rate: ${context.parsed.y}%` }
          }
        },
        scales: { y: { min: 90, max: 100, ticks: { callback: (value) => value + '%' } }, x: { grid: { display: false } } },
        interaction: { intersect: false, mode: 'index' },
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statsObserver) { this.statsObserver.disconnect(); }
    if (this.featuresObserver) { this.featuresObserver.disconnect(); }
    if (this.claimsChart) { this.claimsChart.destroy(); }
    if (this.partnerInterval) { clearInterval(this.partnerInterval); }
  }
}
