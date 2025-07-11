import { Routes } from '@angular/router';
import { Frontpage } from '../components/frontpage/frontpage.component';
import { BlogComponent } from '../components/blog/blog.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: Frontpage },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
