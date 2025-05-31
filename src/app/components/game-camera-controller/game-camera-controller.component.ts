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
  public isDragging = signal<boolean>(false);
  public lastPanPosition = signal<{ x: number; y: number } | null>(null);
  private panSensitivity = 2;

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
        if (this.isDragging()) return;
        const { x, y } = this.scrollVector();
        if (x === 0 && y === 0) return;

        const curPos = gamestate().camera;
        setCameraPosition(curPos.x + x, curPos.y + y);
      });
  }

  public panStart(event: MouseEvent): void {
    event.preventDefault();

    this.isDragging.set(true);
    this.lastPanPosition.set({ x: event.clientX, y: event.clientY });
    this.stopScroll();
  }

  public panMove(event: MouseEvent): void {
    if (!this.isDragging() || !this.lastPanPosition()) {
      return;
    }

    const lastPos = this.lastPanPosition()!;
    const deltaX = event.clientX - lastPos.x;
    const deltaY = event.clientY - lastPos.y;

    const currentCameraPos = gamestate().camera;

    const newCameraX = currentCameraPos.x - deltaX / this.panSensitivity;
    const newCameraY = currentCameraPos.y - deltaY / this.panSensitivity;

    setCameraPosition(newCameraX, newCameraY);

    this.lastPanPosition.set({ x: event.clientX, y: event.clientY });
  }

  public panEnd(): void {
    this.isDragging.set(false);
    this.lastPanPosition.set(null);
  }

  public panLeave(): void {
    if (this.isDragging()) {
      this.panEnd();
    }
  }
}
