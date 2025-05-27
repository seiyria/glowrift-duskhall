import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TippyDirective } from '@ngneat/helipopper';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RequireSetupDirective } from '../../directives/require-setup.directive';
import {
  closeAllMenus,
  focusCameraOnPlayer,
  globalStatusText,
  isGameloopPaused,
  showHeroesMenu,
  showOptionsMenu,
} from '../../helpers';
import { MetaService } from '../../services/meta.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [
    TippyDirective,
    RequireSetupDirective,
    IconComponent,
    SweetAlert2Module,
  ],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public meta = inject(MetaService);
  public router = inject(Router);

  public isPaused = computed(() => isGameloopPaused());
  public currentStatus = computed(() => globalStatusText());

  public toggleOptions() {
    if (showOptionsMenu()) {
      showOptionsMenu.set(false);
      return;
    }

    closeAllMenus();
    showOptionsMenu.set(!showOptionsMenu());
  }

  public toggleHeroes() {
    if (showHeroesMenu()) {
      showHeroesMenu.set(false);
      return;
    }

    closeAllMenus();
    showHeroesMenu.set(!showHeroesMenu());
  }

  public focusCamera() {
    focusCameraOnPlayer();
  }

  public togglePause() {
    isGameloopPaused.set(!isGameloopPaused());
  }
}
