import { Component, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerX } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-button-close',
  imports: [NgIconComponent],
  providers: [provideIcons({ tablerX })],
  templateUrl: './button-close.component.html',
  styleUrl: './button-close.component.scss',
})
export class ButtonCloseComponent {
  public click = output<void>();
}
