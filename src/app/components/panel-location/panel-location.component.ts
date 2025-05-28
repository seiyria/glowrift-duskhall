import { Component, computed, input } from '@angular/core';
import {
  gamestate,
  isAtNode,
  isTravelingToNode,
  showLocationMenu,
  travelTimeFromCurrentLocationTo,
  travelToNode,
} from '../../helpers';
import { WorldLocation } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { CardPageComponent } from '../card-page/card-page.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { IconComponent } from '../icon/icon.component';
import { LocationClaimProgressTextComponent } from '../location-claim-progress-text/location-claim-progress-text.component';
import { LocationGuardianDisplayComponent } from '../location-guardian-display/location-guardian-display.component';
import { MarkerElementComponent } from '../marker-element/marker-element.component';
import { MarkerLocationClaimComponent } from '../marker-location-claim/marker-location-claim.component';

@Component({
  selector: 'app-panel-location',
  imports: [
    CardPageComponent,
    IconComponent,
    MarkerLocationClaimComponent,
    AtlasImageComponent,
    MarkerElementComponent,
    CountdownComponent,
    LocationClaimProgressTextComponent,
    LocationGuardianDisplayComponent,
  ],
  templateUrl: './panel-location.component.html',
  styleUrl: './panel-location.component.css',
})
export class PanelLocationComponent {
  public location = input.required<WorldLocation>();

  public travelTimeSeconds = computed(() => {
    if (this.isTravelingToThisNode()) {
      return gamestate().hero.travel.ticksLeft;
    }

    return travelTimeFromCurrentLocationTo(this.location());
  });

  public isTravelingToThisNode = computed(() =>
    isTravelingToNode(this.location()),
  );
  public travelTimeRemaining = computed(
    () => gamestate().hero.travel.ticksLeft,
  );
  public isAtThisNode = computed(() => isAtNode(this.location()));

  public canTravelToThisNode = computed(
    () => !this.isAtThisNode() && !this.isTravelingToThisNode(),
  );

  closeMenu() {
    showLocationMenu.set(undefined);
  }

  travelToThisNode() {
    travelToNode(this.location());
  }
}
