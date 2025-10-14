// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { BackToTop } from './shared/back-to-top/back-to-top'; // <-- IMPORT NEW COMPONENT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    BackToTop // <-- ADD COMPONENT TO IMPORTS
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'palmsure-corp-v2';
}
