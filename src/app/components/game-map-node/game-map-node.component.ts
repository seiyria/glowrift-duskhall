import { Component, input } from '@angular/core';
import { GameStateWorldNode } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';

@Component({
  selector: 'app-game-map-node',
  imports: [AtlasImageComponent],
  templateUrl: './game-map-node.component.html',
  styleUrl: './game-map-node.component.scss',
})
export class GameMapNodeComponent {
  public node = input.required<GameStateWorldNode>();
  public x = input.required<number>();
  public y = input.required<number>();
}
