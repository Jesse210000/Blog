import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { IBlogPost } from '../../app/interfaces/blog';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogGridComponent } from '../blog-grid/blog-grid.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
  imports: [CommonModule, AsyncPipe, NavbarComponent, BlogGridComponent]
})
export class Frontpage {
  blogs$: Observable<IBlogPost[]>;

  constructor(private blogService: BlogService) {
    this.blogs$ = this.blogService.getAllPosts();
  }
}
