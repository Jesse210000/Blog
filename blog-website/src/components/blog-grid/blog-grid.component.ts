import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IBlogPost } from '../../app/interfaces/blog';

@Component({
  selector: 'app-article-card-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  inputs: ['blogs']
})
export class BlogGridComponent {
  @Input({ required: true }) blogs!: Signal<IBlogPost[]>;
}
