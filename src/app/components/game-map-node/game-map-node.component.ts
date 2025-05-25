import { Component, computed, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { ShowIfOptionDirective } from '../../directives/option-hide.directive';
import { isAtNode, showLocationMenu } from '../../helpers';
import { WorldLocation } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { LocationClaimProgressBarComponent } from '../location-claim-progress-bar/location-claim-progress-bar.component';
import { MarkerLocationClaimComponent } from '../marker-location-claim/marker-location-claim.component';

@Component({
  selector: 'app-game-map-node',
  imports: [
    AtlasImageComponent,
    ShowIfOptionDirective,
    TippyDirective,
    MarkerLocationClaimComponent,
    LocationClaimProgressBarComponent,
  ],
  templateUrl: './game-map-node.component.html',
  styleUrl: './game-map-node.component.scss',
})
export class GameMapNodeComponent {
  public node = input.required<WorldLocation>();
  public x = input.required<number>();
  public y = input.required<number>();

  public isAtThisNode = computed(() => isAtNode(this.node()));

  public investigateLocation() {
    showLocationMenu.set(this.node());
  }
}
