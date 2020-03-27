import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  // better: ng g guard services/admin-auth  
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUsr$.pipe(
      take(1),
      map(usr => usr.isAdmin),
      tap(loggedIn => {
        console.log('admin-guard1=>loggedIn'); console.log(loggedIn);
        if (!loggedIn){
          console.log('no rights here');
          this.router.navigate(['/my/orders']);
          //this.router.navigate(['/access-denied']);
        }
      })
      );
  }

}
