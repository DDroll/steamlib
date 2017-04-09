import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', component: LibraryComponent},
  {path: 'settings', component: SettingsComponent}
];

export const routing = RouterModule.forRoot(routes);
