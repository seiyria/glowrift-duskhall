import { Component, computed } from '@angular/core';
import { GameCameraControllerComponent } from '../../components/game-camera-controller/game-camera-controller.component';
import { GameMapComponent } from '../../components/game-map/game-map.component';
import { NavbarMenuHeroesComponent } from '../../components/navbar-menu-heroes/navbar-menu-heroes.component';
import { NavbarMenuOptionsComponent } from '../../components/navbar-menu-options/navbar-menu-options.component';
import { showHeroesMenu, showOptionsMenu } from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [
    GameMapComponent,
    GameCameraControllerComponent,
    NavbarMenuOptionsComponent,
    NavbarMenuHeroesComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  public showOptions = computed(() => showOptionsMenu());
  public showHeroes = computed(() => showHeroesMenu());
}
