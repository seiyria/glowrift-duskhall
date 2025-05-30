import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { marked } from 'marked';
import { combatLog } from '../../helpers';

@Component({
  selector: 'app-panel-combat-combatlog',
  imports: [CommonModule],
  templateUrl: './panel-combat-combatlog.component.html',
  styleUrl: './panel-combat-combatlog.component.scss',
})
export class PanelCombatCombatlogComponent {
  public allCombatLogs = computed(() =>
    combatLog().map((log) => ({
      ...log,
      message: marked.parse(log.message),
    })),
  );
}
