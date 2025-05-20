import { Routes } from '@angular/router';
import { OptionsDebugComponent } from './pages/options-debug/options-debug.component';
import { OptionsSavefileComponent } from './pages/options-savefile/options-savefile.component';
import { OptionsUIComponent } from './pages/options-ui/options-ui.component';

export const optionsRoutes: Routes = [
  {
    component: OptionsUIComponent,
    path: 'ui',
  },
  {
    component: OptionsSavefileComponent,
    path: 'savefile',
  },
  {
    component: OptionsDebugComponent,
    path: 'debug',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'ui',
  },
];
