import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="bg-light py-4 mt-5">
      <div class="container text-center">
        <p class="text-muted mb-0">AngularBlog &copy; {{ currentYear }}. All rights reserved.</p>
      </div>
    </footer>
  `
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}