import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { IBlogPost } from '../app/interfaces/blog';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly BASE_API_URL = 'http://localhost:3000/api';
  private readonly blogsUrl = `${this.BASE_API_URL}/blogs`;
  private readonly loginUrl = `${this.BASE_API_URL}/login`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllPostsSignal() {
    return toSignal(this.http.get<IBlogPost[]>(this.blogsUrl), { initialValue: [] });
  }

  getAPostSignalById(blogId: string): Signal<IBlogPost | undefined> {
    return toSignal(this.http.get<IBlogPost>(`${this.blogsUrl}/${blogId}`));
  }

  login(credentials: { password: string }) {
    this.http.post<{ token: string }>(this.loginUrl, credentials).subscribe({
      next: ({ token }) => {
        sessionStorage.setItem('admin_token', token);
        this.router.navigate(['/admin']);
      },
      error: () => alert('Login failed'),
    });
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('admin_token');
  }

  logout() {
    sessionStorage.removeItem('admin_token');
    this.router.navigate(['/login']);
  }
}
