import { Directive, HostBinding } from '@angular/core';
import { isSetup } from '../helpers';

@Directive({
  selector: '[appRequireSetup]',
})
export class RequireSetupDirective {
  @HostBinding('class.hidden')
  public get hidden() {
    return !isSetup();
  }
}
