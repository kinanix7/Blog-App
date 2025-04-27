import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  categories: string[] = [];
  loading = true;
  
  searchQuery = '';
  selectedCategory = '';
  
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching posts', error);
        this.loading = false;
      }
    });
  }

  search(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  filterByCategory(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.posts];
    
    if (this.selectedCategory) {
      result = result.filter(post => post.category === this.selectedCategory);
    }
    
    //  search 
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
      );
    }
    
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this.totalPages = Math.ceil(result.length / this.pageSize);
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredPosts = result.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.applyFilters();
    window.scrollTo(0, 0);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}