import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { SetupComponent } from './pages/setup/setup.component';
import { TransitionComponent } from './pages/transition/transition.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: TransitionComponent,
    path: 'transition',
  },
  {
    component: SetupComponent,
    path: 'setup',
    loadChildren: () =>
      import('./setup.routes').then((routes) => routes.setupRoutes),
  },
  {
    component: GameComponent,
    path: 'game',
    loadChildren: () =>
      import('./game.routes').then((routes) => routes.gameRoutes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
