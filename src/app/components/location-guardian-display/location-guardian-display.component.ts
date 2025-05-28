import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { Guardian } from '../../interfaces';
import { AtlasAnimationComponent } from '../atlas-animation/atlas-animation.component';
import { MarkerStatComponent } from '../marker-stat/marker-stat.component';

@Component({
  selector: 'app-location-guardian-display',
  imports: [AtlasAnimationComponent, TippyDirective, MarkerStatComponent],
  templateUrl: './location-guardian-display.component.html',
  styleUrl: './location-guardian-display.component.scss',
})
export class LocationGuardianDisplayComponent {
  public guardian = input.required<Guardian>();
}
