import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ALL_ICONS } from '../../helpers';
import { GameElement } from '../../interfaces';
import { IconComponent } from '../icon/icon.component';

const icons: Record<GameElement, keyof typeof ALL_ICONS> = {
  Fire: 'gameSmallFire',
  Ice: 'gameIceCube',
  Air: 'gameIceCube',
  Earth: 'gameStonePile',
};

@Component({
  selector: 'app-marker-element',
  imports: [IconComponent, TitleCasePipe],
  templateUrl: './marker-element.component.html',
  styleUrl: './marker-element.component.css',
})
export class MarkerElementComponent {
  public element = input.required<GameElement>();
  public value = input.required<string>();

  public icon = computed(() => icons[this.element()]);
}
