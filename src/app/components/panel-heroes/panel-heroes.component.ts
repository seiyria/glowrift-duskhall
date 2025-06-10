import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  equipItem,
  gamestate,
  showHeroesMenu,
  sortedRarityList,
  unequipItem,
} from '../../helpers';
import { EquipmentItem, EquipmentSlot } from '../../interfaces';
import { CardPageComponent } from '../card-page/card-page.component';
import { IconHeroComponent } from '../icon-hero/icon-hero.component';
import { IconComponent } from '../icon/icon.component';
import { InventoryGridItemComponent } from '../inventory-grid-item/inventory-grid-item.component';
import { PanelHeroEquipmentComponent } from '../panel-hero-equipment/panel-hero-equipment.component';
import { PanelHeroesStatsComponent } from '../panel-heroes-stats/panel-heroes-stats.component';

@Component({
  selector: 'app-panel-heroes',
  imports: [
    CardPageComponent,
    IconComponent,
    PanelHeroesStatsComponent,
    IconHeroComponent,
    PanelHeroEquipmentComponent,
    InventoryGridItemComponent,
    TitleCasePipe,
  ],
  templateUrl: './panel-heroes.component.html',
  styleUrl: './panel-heroes.component.css',
})
export class PanelHeroesComponent {
  public allHeroes = computed(() => gamestate().hero.heroes);

  public activeHeroIndex = signal<number>(0);
  public activeHero = computed(() => this.allHeroes()[this.activeHeroIndex()]);

  public equipItemType = signal<EquipmentSlot | undefined>(undefined);
  public visibleItemsToEquip = computed(() =>
    sortedRarityList(
      gamestate().inventory.items.filter(
        (i) => i.__type === this.equipItemType(),
      ),
    ),
  );

  closeMenu() {
    showHeroesMenu.set(false);
  }

  closeEquipment() {
    this.equipItemType.set(undefined);
  }

  setHeroIndex(index: number) {
    this.activeHeroIndex.set(index);
    this.equipItemType.set(undefined);
  }

  setEquipType(type: EquipmentSlot) {
    this.equipItemType.set(type);
  }

  equipItem(item: EquipmentItem) {
    equipItem(this.activeHero(), item);
  }

  unequipItem(itemSlot: EquipmentSlot) {
    const item = this.activeHero().equipment[itemSlot];
    if (!item) return;

    unequipItem(this.activeHero(), item);
  }
}
