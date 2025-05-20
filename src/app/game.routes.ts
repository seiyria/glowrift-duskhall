import { Routes } from '@angular/router';
import { GamePlayComponent } from './pages/game-play/game-play.component';

export const gameRoutes: Routes = [
  {
    component: GamePlayComponent,
    path: '',
    data: { name: 'Play Game' },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
