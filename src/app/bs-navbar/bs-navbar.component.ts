import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(private auth: AuthService) { 
    this.auth.appUsr$.subscribe(au => this.appUser = au);
  }

  logout(): void {
    this.auth.logout();
  }

}
