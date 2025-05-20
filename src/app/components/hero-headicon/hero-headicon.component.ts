import { Component, computed, input } from '@angular/core';
import { HeroDefinition } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';

@Component({
  selector: 'app-hero-headicon',
  imports: [AtlasImageComponent],
  templateUrl: './hero-headicon.component.html',
  styleUrl: './hero-headicon.component.scss',
})
export class HeroHeadiconComponent {
  public hero = input.required<HeroDefinition>();

  public heroClass = computed(() =>
    this.hero().subtype ? 'Hybrid' : this.hero().type,
  );
}
