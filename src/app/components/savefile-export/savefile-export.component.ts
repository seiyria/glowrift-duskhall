import { Component } from '@angular/core';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { gamestate } from '../../helpers';

@Component({
  selector: 'app-savefile-export',
  imports: [AnalyticsClickDirective],
  templateUrl: './savefile-export.component.html',
  styleUrl: './savefile-export.component.scss',
})
export class SavefileExportComponent {
  exportSavefile() {
    const state = gamestate();

    const fileName = `glowrift-duskhall-${Date.now()}.glowrift-duskhall`;
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', fileName);
    downloadAnchorNode.click();
  }
}
