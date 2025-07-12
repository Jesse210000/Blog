import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { IBlogPost } from '../../app/interfaces/blog';
import { BlogGridComponent } from '../blog-grid/blog-grid.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
  imports: [CommonModule, BlogGridComponent]
})

export class Frontpage {
  blogs: Signal<IBlogPost[]>;

  constructor(private blogService: BlogService) {
    this.blogs = this.blogService.getAllPostsSignal(); // no toSignal() here!
  }
}
