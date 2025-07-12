import { Component, computed, effect, signal } from '@angular/core';
import { BlogGridComponent } from "../blog-grid/blog-grid.component";
import { IBlogPost } from '../../app/interfaces/blog';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogGridComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent {
  blogs = signal<IBlogPost[]>([]);
  searchQuery = signal('');
  filteredBlogs = computed(() =>
    this.blogs().filter(post =>
      post.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(this.searchQuery().toLowerCase()))
    )
  );

  constructor(private blogService: BlogService) {
    const blogsSignal = blogService.getAllPostsSignal();
    effect(() => this.blogs.set(blogsSignal()));
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}

