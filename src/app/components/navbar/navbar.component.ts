import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TippyDirective } from '@ngneat/helipopper';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RequireSetupDirective } from '../../directives/require-setup.directive';
import {
  closeAllMenus,
  focusCameraOnPlayer,
  gamestate,
  globalStatusText,
  isGameloopPaused,
  showCombatMenu,
  showHeroesMenu,
  showInventoryMenu,
  showOptionsMenu,
} from '../../helpers';
import { GameCurrency } from '../../interfaces';
import { MetaService } from '../../services/meta.service';
import { IconComponent } from '../icon/icon.component';
import { MarkerCurrencyCurrentComponent } from '../marker-currency-current/marker-currency-current.component';

@Component({
  selector: 'app-navbar',
  imports: [
    TippyDirective,
    RequireSetupDirective,
    IconComponent,
    SweetAlert2Module,
    MarkerCurrencyCurrentComponent,
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

  public displayedCurrencies = computed(() => {
    const currentCurrencies = gamestate().currency.currencies;
    return Object.keys(currentCurrencies).filter(
      (c) => c !== 'Mana' && currentCurrencies[c as GameCurrency] > 0,
    ) as GameCurrency[];
  });

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

  public toggleCombat() {
    if (showCombatMenu()) {
      showCombatMenu.set(false);
      return;
    }

    closeAllMenus();
    showCombatMenu.set(!showCombatMenu());
  }

  public toggleInventory() {
    if (showInventoryMenu()) {
      showInventoryMenu.set(false);
      return;
    }

    closeAllMenus();
    showInventoryMenu.set(!showInventoryMenu());
  }

  public focusCamera() {
    focusCameraOnPlayer();
  }

  public togglePause() {
    isGameloopPaused.set(!isGameloopPaused());
  }
}
