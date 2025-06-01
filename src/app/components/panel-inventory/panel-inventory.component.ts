import { Component } from '@angular/core';
import { showInventoryMenu } from '../../helpers';
import { CardPageComponent } from '../card-page/card-page.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-panel-inventory',
  imports: [CardPageComponent, IconComponent],
  templateUrl: './panel-inventory.component.html',
  styleUrl: './panel-inventory.component.scss',
})
export class PanelInventoryComponent {
  closeMenu() {
    showInventoryMenu.set(false);
  }
}
