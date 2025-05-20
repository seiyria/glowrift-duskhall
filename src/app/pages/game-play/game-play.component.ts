import {
  Component,
  computed,
  HostBinding,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { uiScaleX, uiScaleY } from '../../helpers';

@Component({
  selector: 'app-game-play',
  imports: [],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit {
  private windowWidth = signal<number>(window.innerWidth);
  private windowHeight = signal<number>(window.innerHeight);

  public readonly windowMaxWidth = signal<number>(2880);
  public readonly windowMaxHeight = signal<number>(1600);

  public readonly windowScaleX = computed(
    () => this.windowWidth() / this.windowMaxWidth(),
  );
  public readonly windowScaleY = computed(
    () => this.windowHeight() / this.windowMaxHeight(),
  );

  @HostBinding('style.--page-scale-x') public get pageScaleX() {
    return this.windowScaleX();
  }

  @HostBinding('style.--page-scale-y') public get pageScaleY() {
    return this.windowScaleY();
  }

  @HostBinding('style.--page-width') public get pageWidthX() {
    return this.windowMaxWidth();
  }

  @HostBinding('style.--page-height') public get pageWidthY() {
    return this.windowMaxHeight();
  }

  @HostListener('window:resize')
  public onResize() {
    this.handleResize();
  }

  ngOnInit() {
    this.handleResize();
  }

  private handleResize() {
    this.windowWidth.set(window.innerWidth);
    this.windowHeight.set(window.innerHeight);

    uiScaleX.set(this.windowScaleX());
    uiScaleY.set(this.windowScaleY());
  }
}
