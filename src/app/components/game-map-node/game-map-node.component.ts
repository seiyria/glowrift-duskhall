import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { ShowIfOptionDirective } from '../../directives/option-hide.directive';
import { GameStateWorldNode } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-game-map-node',
  imports: [
    AtlasImageComponent,
    ShowIfOptionDirective,
    TippyDirective,
    IconComponent,
  ],
  templateUrl: './game-map-node.component.html',
  styleUrl: './game-map-node.component.scss',
})
export class GameMapNodeComponent {
  public node = input.required<GameStateWorldNode>();
  public x = input.required<number>();
  public y = input.required<number>();
}
