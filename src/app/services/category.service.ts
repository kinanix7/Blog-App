import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
    
  }
}
