import { Component } from '@angular/core';
import { PanelHeroesComponent } from '../panel-heroes/panel-heroes.component';
import { PanelContainerComponent } from '../panel-container/panel-container.component';

@Component({
  selector: 'app-navbar-menu-heroes',
  standalone: true,
  imports: [PanelHeroesComponent, PanelContainerComponent],
  templateUrl: './navbar-menu-heroes.component.html',
  styleUrl: './navbar-menu-heroes.component.scss',
})
export class NavbarMenuHeroesComponent {}
