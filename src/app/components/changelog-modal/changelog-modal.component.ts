import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerPackage } from '@ng-icons/tabler-icons';
import { TippyDirective } from '@ngneat/helipopper';
import { MetaService } from '../../services/meta.service';

@Component({
    selector: 'app-changelog-modal',
    imports: [NgIconComponent, TippyDirective],
    providers: [provideIcons({ tablerPackage })],
    templateUrl: './changelog-modal.component.html',
    styleUrl: './changelog-modal.component.scss'
})
export class ChangelogModalComponent {
  private meta = inject(MetaService);
  private sanitizer = inject(DomSanitizer);

  public readonly color = '#089000';
  public currentColor = '#ccc';

  public currentView = signal<'all' | 'recent'>('recent');

  public text = computed(() =>
    this.currentView() === 'recent'
      ? this.meta.changelogCurrent()
      : this.meta.changelogAll(),
  );
  public safeHtml = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.text()),
  );
}
