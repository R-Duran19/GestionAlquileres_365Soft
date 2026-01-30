import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.html',
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .main-column {
      margin-left: 250px;
    }
  `]
})
export class MainLayoutComponent {}