import { Component, input } from '@angular/core';
import { WorldLocation } from '../../interfaces';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-marker-location-claim',
  imports: [IconComponent],
  templateUrl: './marker-location-claim.component.html',
  styleUrl: './marker-location-claim.component.css',
})
export class MarkerLocationClaimComponent {
  public location = input.required<WorldLocation>();
}
