import { Component, computed, OnInit, signal } from '@angular/core';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { options } from '../../helpers';
import { ConnectButtonsComponent } from '../connect-buttons/connect-buttons.component';
import { OptionsDebugComponent } from '../options-debug/options-debug.component';
import { OptionsSavefileComponent } from '../options-savefile/options-savefile.component';
import { OptionsUIComponent } from '../options-ui/options-ui.component';
import { PageCardComponent } from '../page-card/page-card.component';

@Component({
  selector: 'app-options',
  imports: [
    PageCardComponent,
    ConnectButtonsComponent,
    AnalyticsClickDirective,
    OptionsDebugComponent,
    OptionsSavefileComponent,
    OptionsUIComponent,
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent implements OnInit {
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
}
