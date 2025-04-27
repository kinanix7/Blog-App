import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentSectionComponent],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId && !isNaN(+postId)) {
        this.loadPost(+postId);
      } else {
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadPost(id: number): void {
    this.loading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching post', error);
        this.loading = false;
        this.error = true;
        this.post = null;
      }
    });
  }
}