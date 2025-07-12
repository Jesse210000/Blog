import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { IBlogPost } from '../../app/interfaces/blog';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss'],
})
export class AppBlogContentComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blogPost: Signal<IBlogPost | undefined>;

  constructor() {
    const blogId = this.route.snapshot.paramMap.get('id');

    this.blogPost = blogId
      ? this.blogService.getAPostSignalById(blogId)
      : toSignal(undefined as any, { initialValue: undefined });
  }
}
