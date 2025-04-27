import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentPosts: Post[] = [];
  popularCategories: string[] = ['Angular', 'TypeScript', 'CSS', 'JavaScript'];
  loading = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        // Sort by date and take the most recent posts
        this.recentPosts = posts
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching posts', error);
        this.loading = false;
      }
    });
  }
}