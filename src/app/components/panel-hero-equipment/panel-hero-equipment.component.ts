import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, output, Signal } from '@angular/core';
import { EquipmentItem, EquipmentSlot, Hero } from '../../interfaces';
import { IconItemComponent } from '../icon-item/icon-item.component';

@Component({
  selector: 'app-panel-hero-equipment',
  imports: [IconItemComponent, TitleCasePipe],
  templateUrl: './panel-hero-equipment.component.html',
  styleUrl: './panel-hero-equipment.component.scss',
})
export class PanelHeroEquipmentComponent {
  public hero = input.required<Hero>();
  public slotClick = output<EquipmentSlot>();
  public slotRightClick = output<EquipmentSlot>();

  public items: Signal<
    Array<{ item: EquipmentItem | undefined; slot: EquipmentSlot }>
  > = computed(() => [
    { slot: 'weapon', item: this.hero().equipment.weapon },
    { slot: 'armor', item: this.hero().equipment.armor },
    { slot: 'accessory', item: this.hero().equipment.accessory },
    { slot: 'trinket', item: this.hero().equipment.trinket },
  ]);
}
