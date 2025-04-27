import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  categories: Observable<string[]>;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.getAllCategories();
  }

  ngOnInit(): void {}

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}