import { Component, computed, OnInit, signal } from '@angular/core';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { options, showOptionsMenu } from '../../helpers';
import { CardPageComponent } from '../card-page/card-page.component';
import { ConnectButtonsComponent } from '../connect-buttons/connect-buttons.component';
import { IconComponent } from '../icon/icon.component';
import { PanelOptionsDebugComponent } from '../panel-options-debug/panel-options-debug.component';
import { PanelOptionsSavefileComponent } from '../panel-options-savefile/panel-options-savefile.component';
import { PanelOptionsUIComponent } from '../panel-options-ui/panel-options-ui.component';

@Component({
  selector: 'app-panel-options',
  imports: [
    CardPageComponent,
    ConnectButtonsComponent,
    AnalyticsClickDirective,
    PanelOptionsDebugComponent,
    PanelOptionsSavefileComponent,
    PanelOptionsUIComponent,
    IconComponent,
  ],
  templateUrl: './panel-options.component.html',
  styleUrl: './panel-options.component.css',
})
export class PanelOptionsComponent implements OnInit {
  public activeTab = signal<string>('ui');

  public readonly tabs = [
    {
      name: 'UI',
      link: 'ui',
      showIf: computed(() => true),
    },
    { name: 'Savefile', link: 'savefile', showIf: computed(() => true) },
    {
      name: 'Debug',
      link: 'debug',
      showIf: computed(() => options().showDebug),
    },
  ];

  ngOnInit() {
    const firstVisibleTab = this.tabs.find((tab) => tab.showIf());
    if (firstVisibleTab) {
      this.activeTab.set(firstVisibleTab.link);
    }
  }

  closeMenu() {
    showOptionsMenu.set(false);
  }
}
