import { Component } from '@angular/core';
import { localStorageSignal, showCombatMenu } from '../../helpers';
import { CardPageComponent } from '../card-page/card-page.component';
import { IconComponent } from '../icon/icon.component';
import { PanelCombatClaimsComponent } from '../panel-combat-claims/panel-combat-claims.component';
import { PanelCombatCombatlogComponent } from '../panel-combat-combatlog/panel-combat-combatlog.component';
import { PanelCombatPreferencesComponent } from '../panel-combat-preferences/panel-combat-preferences.component';

@Component({
  selector: 'app-panel-combat',
  imports: [
    CardPageComponent,
    IconComponent,
    PanelCombatPreferencesComponent,
    PanelCombatCombatlogComponent,
    PanelCombatClaimsComponent,
  ],
  templateUrl: './panel-combat.component.html',
  styleUrl: './panel-combat.component.css',
})
export class PanelCombatComponent {
  public activeTab = localStorageSignal<string>('combatTab', 'preferences');

  public readonly tabs = [
    {
      name: 'Preferences',
      link: 'preferences',
    },
    { name: 'Claims', link: 'claims' },
    { name: 'Combat Log', link: 'combatlog' },
  ];

  closeMenu() {
    showCombatMenu.set(false);
  }
}
