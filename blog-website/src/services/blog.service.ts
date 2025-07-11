import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlogPost } from '../app/interfaces/blog';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<IBlogPost[]> {
    return this.http.get<IBlogPost[]>(this.apiUrl);
  }
}
