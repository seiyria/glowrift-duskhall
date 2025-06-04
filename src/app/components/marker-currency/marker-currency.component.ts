import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ALL_ICONS } from '../../helpers';
import { GameCurrency } from '../../interfaces';
import { GameCurrencyPipe } from '../../pipes/game-currency.pipe';
import { IconComponent } from '../icon/icon.component';

const icons: Record<GameCurrency, keyof typeof ALL_ICONS> = {
  'Air Core': 'gameGlassBall',
  'Air Crystal': 'gameEmerald',
  'Air Shard': 'gameStonePile',
  'Air Sliver': 'gameEarthWorm',
  'Earth Core': 'gameGlassBall',
  'Earth Crystal': 'gameEmerald',
  'Earth Shard': 'gameStonePile',
  'Earth Sliver': 'gameEarthWorm',
  'Fire Core': 'gameGlassBall',
  'Fire Crystal': 'gameEmerald',
  'Fire Shard': 'gameStonePile',
  'Fire Sliver': 'gameEarthWorm',
  'Ice Core': 'gameGlassBall',
  'Ice Crystal': 'gameEmerald',
  'Ice Shard': 'gameStonePile',
  'Ice Sliver': 'gameEarthWorm',
  'Soul Essence': 'gameDoubleRingedOrb',
  Mana: 'gameBallGlow',
};

@Component({
  selector: 'app-marker-currency',
  imports: [IconComponent, GameCurrencyPipe, TitleCasePipe],
  templateUrl: './marker-currency.component.html',
  styleUrl: './marker-currency.component.css',
})
export class MarkerCurrencyComponent {
  public currency = input.required<GameCurrency>();
  public value = input.required<number>();

  public icon = computed(() => icons[this.currency()]);
}
