import { Component } from '@angular/core';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { OptionsBaseComponent } from '../options/option-base-page.component';

@Component({
  selector: 'app-options-debug',
  imports: [AnalyticsClickDirective],
  templateUrl: './options-debug.component.html',
  styleUrl: './options-debug.component.scss',
})
export class OptionsDebugComponent extends OptionsBaseComponent {}
