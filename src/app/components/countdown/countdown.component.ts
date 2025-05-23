import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  public secondsLeft = input.required<number>();
  public label = input<string>();
  public parenthesize = input<boolean>();

  public secondsUntilReset = computed(() =>
    Math.floor(this.secondsLeft() % 60),
  );
  public minutesUntilReset = computed(() =>
    Math.floor(this.secondsLeft() / 60),
  );
}
