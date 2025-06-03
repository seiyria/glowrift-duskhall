import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-page',
  imports: [CommonModule],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css',
})
export class CardPageComponent {
  public height = input<string>('50vh');
}
