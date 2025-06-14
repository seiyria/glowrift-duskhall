import { Component, HostListener } from '@angular/core';
import { GameCameraControllerComponent } from '../../components/game-camera-controller/game-camera-controller.component';
import { GameMapComponent } from '../../components/game-map/game-map.component';
import { PanelCombatComponent } from '../../components/panel-combat/panel-combat.component';
import { PanelHeroesComponent } from '../../components/panel-heroes/panel-heroes.component';
import { PanelInventoryComponent } from '../../components/panel-inventory/panel-inventory.component';
import { PanelLocationComponent } from '../../components/panel-location/panel-location.component';
import { PanelOptionsComponent } from '../../components/panel-options/panel-options.component';
import { closeAllMenus } from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [
    GameMapComponent,
    GameCameraControllerComponent,
    PanelOptionsComponent,
    PanelHeroesComponent,
    PanelLocationComponent,
    PanelCombatComponent,
    PanelInventoryComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    closeAllMenus();
    event.preventDefault();
    event.stopPropagation();
  }
}
