import { Component, computed } from '@angular/core';
import { gamestate } from '../../helpers';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';

@Component({
  selector: 'app-panel-combat-claims',
  imports: [AtlasImageComponent],
  templateUrl: './panel-combat-claims.component.html',
  styleUrl: './panel-combat-claims.component.scss',
})
export class PanelCombatClaimsComponent {
  public maxClaims = computed(() => gamestate().world.nodeCounts);
  public claims = computed(() => gamestate().world.claimedCounts);
}
