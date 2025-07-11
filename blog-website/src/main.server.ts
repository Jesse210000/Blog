import { bootstrapApplication } from '@angular/platform-browser';
import { Frontpage } from './components/frontpage/frontpage.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(Frontpage, config);

export default bootstrap;
