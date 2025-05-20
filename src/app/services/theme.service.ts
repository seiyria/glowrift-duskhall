import { effect, Injectable } from '@angular/core';
import { getOption } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    effect(() => {
      const theme = getOption('uiTheme');
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  init() {}
}
