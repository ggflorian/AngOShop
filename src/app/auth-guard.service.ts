import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { take, map, tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // better: ng g guard services/auth
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.getUserState().pipe(
      take(1), // complete the Observable after the first value is emitted
      map(usr => !!usr), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn){
          console.log('no access');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      })
    )
  }

}
