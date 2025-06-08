import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { sortBy } from 'lodash';
import {
  gamestate,
  getCurrencyClaimsForNode,
  isAtNode,
  isTravelingToNode,
  showLocationMenu,
  totalTicksElapsed,
  travelTimeFromCurrentLocationTo,
  travelToNode,
} from '../../helpers';
import { GameCurrency, WorldLocation } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { CardPageComponent } from '../card-page/card-page.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { IconItemComponent } from '../icon-currency/icon-currency.component';
import { IconElementComponent } from '../icon-element/icon-element.component';
import { IconComponent } from '../icon/icon.component';
import { LocationClaimProgressTextComponent } from '../location-claim-progress-text/location-claim-progress-text.component';
import { LocationGuardianDisplayComponent } from '../location-guardian-display/location-guardian-display.component';
import { LocationLootDisplayComponent } from '../location-loot-display/location-loot-display.component';
import { MarkerLocationClaimComponent } from '../marker-location-claim/marker-location-claim.component';

@Component({
  selector: 'app-panel-location',
  imports: [
    CardPageComponent,
    IconComponent,
    MarkerLocationClaimComponent,
    AtlasImageComponent,
    TitleCasePipe,
    CountdownComponent,
    LocationClaimProgressTextComponent,
    LocationGuardianDisplayComponent,
    LocationLootDisplayComponent,
    IconItemComponent,
    IconElementComponent,
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

  public nodeLostTime = computed(
    () => this.location().unclaimTime - totalTicksElapsed(),
  );

  public elements = computed(() => sortBy(this.location().elements, 'element'));

  public resourcesGenerated = computed(() => {
    const generated = getCurrencyClaimsForNode(this.location());
    return sortBy(
      Object.keys(generated)
        .map((resource) => ({
          resource: resource as GameCurrency,
          amount: generated[resource as GameCurrency],
        }))
        .filter((r) => r.amount > 0),
      'resource',
    );
  });

  closeMenu() {
    showLocationMenu.set(undefined);
  }

  travelToThisNode() {
    travelToNode(this.location());
  }
}
