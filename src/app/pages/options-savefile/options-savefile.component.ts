import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SavefileExportComponent } from '../../components/savefile-export/savefile-export.component';
import { SavefileImportComponent } from '../../components/savefile-import/savefile-import.component';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import { blankGameState, gamestate, setGameState } from '../../helpers';

@Component({
  selector: 'app-options-savefile',
  imports: [
    SweetAlert2Module,
    DatePipe,
    DecimalPipe,
    SavefileExportComponent,
    SavefileImportComponent,
    AnalyticsClickDirective,
  ],
  templateUrl: './options-savefile.component.html',
  styleUrl: './options-savefile.component.scss',
})
export class OptionsSavefileComponent {
  private router = inject(Router);

  public startedAt = computed(() => gamestate().meta.createdAt);
  public numTicks = computed(() => gamestate().meta.numTicks);

  async deleteSavefile() {
    await this.router.navigate(['/']);

    setGameState(blankGameState());
  }
}
