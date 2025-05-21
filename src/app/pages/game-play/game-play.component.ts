import { Component, computed } from '@angular/core';
import { GameCameraControllerComponent } from '../../components/game-camera-controller/game-camera-controller.component';
import { GameMapComponent } from '../../components/game-map/game-map.component';
import { MenuOptionsComponent } from '../../components/menu-options/menu-options.component';
import { showOptionsMenu } from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [
    GameMapComponent,
    GameCameraControllerComponent,
    MenuOptionsComponent,
  ],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  public showOptions = computed(() => showOptionsMenu());
}
