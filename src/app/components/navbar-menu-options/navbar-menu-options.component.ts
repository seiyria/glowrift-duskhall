import { Component } from '@angular/core';
import { PanelOptionsComponent } from '../panel-options/panel-options.component';
import { PanelContainerComponent } from '../panel-container/panel-container.component';

@Component({
  selector: 'app-navbar-menu-options',
  standalone: true,
  imports: [PanelOptionsComponent, PanelContainerComponent],
  templateUrl: './navbar-menu-options.component.html',
  styleUrl: './navbar-menu-options.component.scss',
})
export class NavbarMenuOptionsComponent {}
