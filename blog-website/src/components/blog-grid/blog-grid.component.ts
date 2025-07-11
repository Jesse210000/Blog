import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IBlogPost } from '../../app/interfaces/blog';

@Component({
  selector: 'app-article-card-grid',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  inputs: ['blogs$']
})
export class BlogGridComponent {
  blogs$: Observable<IBlogPost[]> | undefined;
}
