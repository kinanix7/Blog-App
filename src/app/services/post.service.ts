import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?category=${category}`)
      .pipe(catchError(this.handleError));
  }

  searchPosts(query: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?q=${query}`)
      .pipe(catchError(this.handleError));
  }

  getPostsByAuthor(authorId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?authorId=${authorId}`)
      .pipe(catchError(this.handleError));
  }

  createPost(post: Post): Observable<Post> {
    // Ensure post has all required fields before sending to server
    if (!post.title || !post.content || !post.category || !post.authorId) {
      return throwError(() => new Error('Post is missing required fields'));
    }
    
    return this.http.post<Post>(this.apiUrl, post)
      .pipe(catchError(this.handleError));
  }

  updatePost(post: Post): Observable<Post> {
    if (!post.id) {
      return throwError(() => new Error('Cannot update post without id'));
    }
    
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
