import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { authGuard } from '../../guard/auth.guard';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatNavList,
    MatIconModule,
    MatListItem,
    MatInputModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private guard: AuthService) {}
  menuItems = [
    { name: 'Dashboard', icon: 'home', route: '/dashboard' },
    { name: 'Hóspedes', icon: 'person', route: '/guest' },
    { name: 'Acomodações', icon: 'night_shelter', route: '/accommodation' },
    { name: 'Locações', icon: 'analytics', route: '/rental' },
    { name: 'Configurações', icon: 'settings', route: '/settings' },
  ];


  logout() {
    this.guard.logout()
  }
}
