import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { getEntriesByType } from '../../helpers';
import { WorldConfig } from '../../interfaces';

@Component({
  selector: 'app-game-setup-world',
  imports: [RouterLink, AnalyticsClickDirective],
  templateUrl: './game-setup-world.component.html',
  styleUrl: './game-setup-world.component.scss',
})
export class GameSetupWorldComponent {
  public allWorldSizes = getEntriesByType<WorldConfig>('worldconfig');
}
