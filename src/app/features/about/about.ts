/* src/app/features/about/about.ts */
import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('metricsSection') metricsSection!: ElementRef<HTMLElement>;
  @ViewChildren('metricValue') metricValues!: QueryList<ElementRef<HTMLSpanElement>>;

  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
    }
  }

  private initializeObserver(): void {
    const options = {
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.metricsSection.nativeElement.classList.add('is-visible');
          this.animateMetricNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.metricsSection.nativeElement);
  }

  private animateMetricNumbers(): void {
    this.metricValues.forEach(elRef => {
      const element = elRef.nativeElement;
      const finalValueText = element.textContent || '0';
      const suffix = finalValueText.replace(/[\d,.]/g, '');
      const endValue = parseFloat(finalValueText.replace(/[^\d.]/g, ''));

      this.countUp(element, endValue, suffix);
    });
  }

  private countUp(element: HTMLElement, end: number, suffix: string): void {
    let start = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = end / totalFrames;

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      element.textContent = Math.floor(start).toLocaleString() + suffix;
    }, frameRate);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
