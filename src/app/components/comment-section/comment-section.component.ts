import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() postId!: number;
  
  comments: Comment[] = [];
  newCommentContent = '';
  loading = true;
  submitting = false;
  deleting = false;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadComments(): void {
    this.loading = true;
    this.commentService.getCommentsByPostId(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching comments', error);
        this.loading = false;
      }
    });
  }

  addComment(): void {
    if (!this.newCommentContent.trim() || !this.authService.currentUser) {
      return;
    }
    
    this.submitting = true;
    const newComment: Comment = {
      postId: this.postId,
      userId: this.authService.currentUser.id!,
      content: this.newCommentContent,
      createdAt: new Date().toISOString()
    };
    
    this.commentService.addComment(newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newCommentContent = '';
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error adding comment', error);
        this.submitting = false;
      }
    });
  }

  deleteComment(commentId: number): void {
    this.deleting = true;
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.deleting = false;
      },
      error: (error) => {
        console.error('Error deleting comment', error);
        this.deleting = false;
      }
    });
  }

  canDeleteComment(comment: Comment): boolean {
    const currentUser = this.authService.currentUser;
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') return true;
    
    return comment.userId === currentUser.id;
  }
}