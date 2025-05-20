import { Component, HostListener, OnInit } from '@angular/core';
import { GameMapComponent } from '../../components/game-map/game-map.component';
import { windowHeight, windowWidth } from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [GameMapComponent],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit {
  @HostListener('window:resize')
  public onResize() {
    this.handleResize();
  }

  ngOnInit() {
    this.handleResize();
  }

  private handleResize() {
    windowWidth.set(window.innerWidth);
    windowHeight.set(window.innerHeight);
  }
}
