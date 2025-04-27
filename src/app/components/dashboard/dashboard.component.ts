import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userPosts: Post[] = [];
  loading = true;
  postToDelete: Post | null = null;
  isDeleting: number | null = null;
  isAdmin = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.hasRole('admin');
  }

  ngOnInit(): void {
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    this.loading = true;
    
    if (!this.authService.currentUser) {
      this.loading = false;
      return;
    }
    
    if (this.isAdmin) {
      this.postService.getAllPosts().subscribe({
        next: (posts) => {
          this.userPosts = posts.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading posts', error);
          this.loading = false;
        }
      });
    } else {
      const userId = this.authService.currentUser.id!;
      this.postService.getPostsByAuthor(userId).subscribe({
        next: (posts) => {
          this.userPosts = posts.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading posts', error);
          this.loading = false;
        }
      });
    }
  }

  confirmDelete(post: Post): void {
    this.postToDelete = post;
  }

  cancelDelete(): void {
    this.postToDelete = null;
  }

  deletePost(): void {
    if (!this.postToDelete) return;
    
    const postId = this.postToDelete.id!;
    this.isDeleting = postId;
    
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.userPosts = this.userPosts.filter(p => p.id !== postId);
        this.postToDelete = null;
        this.isDeleting = null;
      },
      error: (error) => {
        console.error('Error deleting post', error);
        this.postToDelete = null;
        this.isDeleting = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}