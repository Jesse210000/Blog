import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);

  form = this.fb.nonNullable.group({
    password: ''
  });

  login() {
    const password = this.form.value.password;
    if (!password) return;

    this.blogService.login({ password });
  }
}
