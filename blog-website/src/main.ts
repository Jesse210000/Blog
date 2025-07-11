import { bootstrapApplication } from '@angular/platform-browser';
import { Frontpage } from './components/frontpage/frontpage.component'
import { provideRouter } from '@angular/router';

const routes = [
  { path: '', component: Frontpage}
];


bootstrapApplication(Frontpage, {
  providers: [provideRouter(routes)]});
