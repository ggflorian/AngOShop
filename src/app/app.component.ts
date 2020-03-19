import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshop';

  constructor(private userService: UserService, private auth: AuthService, router: Router){
    alert('app1');
    
    auth.user$.subscribe(user => {
      if (user){
        alert('app2');
        userService.save(user);

        let retUrl = localStorage.getItem('rtrUrl');
        router.navigateByUrl(retUrl);
      }
    })
  }
}
