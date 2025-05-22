import { Component } from '@angular/core';
import { PanelHeroesComponent } from '../panel-heroes/panel-heroes.component';

@Component({
  selector: 'app-navbar-menu-heroes',
  imports: [PanelHeroesComponent],
  templateUrl: './navbar-menu-heroes.component.html',
  styleUrl: './navbar-menu-heroes.component.css',
})
export class NavbarMenuHeroesComponent {}
