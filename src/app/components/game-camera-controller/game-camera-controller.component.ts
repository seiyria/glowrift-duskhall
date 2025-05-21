import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { gamestate, setCameraPosition } from '../../helpers';

@Component({
  selector: 'app-game-camera-controller',
  imports: [],
  templateUrl: './game-camera-controller.component.html',
  styleUrl: './game-camera-controller.component.scss',
})
export class GameCameraControllerComponent {
  public scrollVector = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  public startScroll(x: number, y: number): void {
    this.scrollVector.set({ x, y });
  }

  public stopScroll(): void {
    this.scrollVector.set({ x: 0, y: 0 });
  }

  constructor() {
    interval(100)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const { x, y } = this.scrollVector();
        if (x === 0 && y === 0) return;

        const curPos = gamestate().camera;
        setCameraPosition(curPos.x + x, curPos.y + y);
      });
  }
}
