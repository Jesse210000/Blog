import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { IBlogPost } from '../app/interfaces/blog';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  getAllPostsSignal() {
    return toSignal(this.http.get<IBlogPost[]>(this.apiUrl), { initialValue: [] });
  }

  getAPostSignalById(blogId: string): Signal<IBlogPost | undefined> {
    return toSignal(this.http.get<IBlogPost>(`${this.apiUrl}/${blogId}`));
  }

}
