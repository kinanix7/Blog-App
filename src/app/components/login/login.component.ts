import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';
    this.isLoading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Invalid email or password. Please try again.';
        this.isLoading = false;
      }
    });
  }

  setDemoUser(type: 'admin' | 'author'): void {
    if (type === 'admin') {
      this.email = 'admin@blog.com';
      this.password = 'admin123';
    } else {
      this.email = 'alice@example.com';
      this.password = 'alice123';
    }
  }
}