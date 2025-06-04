import { NgClass, TitleCasePipe } from '@angular/common';
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

const colors: Record<GameCurrency, string> = {
  'Air Core': 'text-green-500',
  'Air Crystal': 'text-green-500',
  'Air Shard': 'text-green-500',
  'Air Sliver': 'text-green-500',
  'Earth Core': 'text-amber-700',
  'Earth Crystal': 'text-amber-700',
  'Earth Shard': 'text-amber-700',
  'Earth Sliver': 'text-amber-700',
  'Fire Core': 'text-red-600',
  'Fire Crystal': 'text-red-600',
  'Fire Shard': 'text-red-600',
  'Fire Sliver': 'text-red-600',
  'Ice Core': 'text-sky-500',
  'Ice Crystal': 'text-sky-500',
  'Ice Shard': 'text-sky-500',
  'Ice Sliver': 'text-sky-500',
  'Soul Essence': 'text-indigo-500',
  Mana: 'text-fuchsia-500',
};

@Component({
  selector: 'app-marker-currency',
  imports: [IconComponent, GameCurrencyPipe, TitleCasePipe, NgClass],
  templateUrl: './marker-currency.component.html',
  styleUrl: './marker-currency.component.css',
})
export class MarkerCurrencyComponent {
  public currency = input.required<GameCurrency>();
  public value = input.required<number>();

  public icon = computed(() => icons[this.currency()]);
  public color = computed(() => `${colors[this.currency()]}`);
}
