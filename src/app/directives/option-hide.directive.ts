import { Directive, HostBinding, input } from '@angular/core';
import { getOption } from '../helpers';
import { GameOption } from '../interfaces';

@Directive({
  selector: '[appShowIfOption]',
})
export class ShowIfOptionDirective {
  public appShowIfOption = input.required<GameOption>();

  @HostBinding('class.hidden')
  public get hidden() {
    return !getOption(this.appShowIfOption());
  }
}
