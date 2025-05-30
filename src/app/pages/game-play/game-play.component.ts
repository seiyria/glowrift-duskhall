import { Component, computed } from '@angular/core';
import { GameCameraControllerComponent } from '../../components/game-camera-controller/game-camera-controller.component';
import { GameMapComponent } from '../../components/game-map/game-map.component';
import { PanelCombatComponent } from '../../components/panel-combat/panel-combat.component';
import { PanelHeroesComponent } from '../../components/panel-heroes/panel-heroes.component';
import { PanelLocationComponent } from '../../components/panel-location/panel-location.component';
import { PanelOptionsComponent } from '../../components/panel-options/panel-options.component';
import {
  showCombatMenu,
  showHeroesMenu,
  showLocationMenu,
  showOptionsMenu,
} from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [
    GameMapComponent,
    GameCameraControllerComponent,
    PanelOptionsComponent,
    PanelHeroesComponent,
    PanelLocationComponent,
    PanelCombatComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  public showOptions = computed(() => showOptionsMenu());
  public showHeroes = computed(() => showHeroesMenu());
  public showCombat = computed(() => showCombatMenu());
  public showLocation = computed(() => showLocationMenu());
}
