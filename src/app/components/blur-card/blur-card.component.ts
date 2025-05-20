import { Component, input } from '@angular/core';

@Component({
    selector: 'app-blur-card',
    imports: [],
    templateUrl: './blur-card.component.html',
    styleUrl: './blur-card.component.scss'
})
export class BlurCardComponent {
  public text = input.required<string>();
}
