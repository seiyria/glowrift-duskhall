import { Component, computed, HostBinding, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ALL_ICONS } from '../../helpers';

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  providers: [provideIcons(ALL_ICONS)],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  public name = input.required<keyof typeof ALL_ICONS>();
  public size = input<string>('1em');
  public color = input<string>('');

  public icon = computed(() => {
    return ALL_ICONS[this.name()];
  });

  @HostBinding('style.height') public get maxHeight() {
    return this.size();
  }
}
