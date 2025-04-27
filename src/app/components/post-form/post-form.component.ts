import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = {
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    authorId: 0,
    createdAt: ''
  };
  
  categories: string[] = [];
  isEditMode = false;
  isLoading = false;
  error = '';
  isAdmin = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAdmin = this.authService.hasRole('admin');
  }

  ngOnInit(): void {
    this.loadCategories();
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.authService.currentUser) {
      this.post.authorId = this.authService.currentUser.id || 0;
    }
    
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.isEditMode = true;
        this.loadPost(+postId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        this.error = 'Failed to load categories. Please try again.';
      }
    });
  }

  loadPost(id: number): void {
    this.isLoading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
     
        if (post.authorId !== this.authService.currentUser?.id && 
            !this.isAdmin) {
          this.router.navigate(['/dashboard']);
          return;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading post', error);
        this.error = 'Failed to load post. Please try again.';
        this.isLoading = false;
      }
    });
  }

  savePost(): void {
    this.isLoading = true;
    this.error = '';
    
    if (!this.isEditMode) {
      this.post.createdAt = new Date().toISOString();
      
      if (this.authService.currentUser) {
        this.post.authorId = this.authService.currentUser.id || 0;
      }
    }
    
    if (!this.post.title || !this.post.content || !this.post.category) {
      this.error = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }
    
    const saveOperation = this.isEditMode
      ? this.postService.updatePost(this.post)
      : this.postService.createPost(this.post);
      
    saveOperation.subscribe({
      next: (savedPost) => {
        this.isLoading = false;
        this.router.navigate(['/post', savedPost.id]);
      },
      error: (error) => {
        console.error('Error saving post', error);
        this.error = 'Failed to save post. Please try again.';
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['/post', this.post.id]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
