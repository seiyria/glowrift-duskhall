import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { ShowIfOptionDirective } from '../../directives/option-hide.directive';
import { showLocationMenu } from '../../helpers';
import { WorldLocation } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { MarkerLocationClaimComponent } from '../marker-location-claim/marker-location-claim.component';

@Component({
  selector: 'app-game-map-node',
  imports: [
    AtlasImageComponent,
    ShowIfOptionDirective,
    TippyDirective,
    MarkerLocationClaimComponent,
  ],
  templateUrl: './game-map-node.component.html',
  styleUrl: './game-map-node.component.scss',
})
export class GameMapNodeComponent {
  public node = input.required<WorldLocation>();
  public x = input.required<number>();
  public y = input.required<number>();

  public investigateLocation() {
    showLocationMenu.set(this.node());
  }
}
