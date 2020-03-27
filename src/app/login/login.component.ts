import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    })
  }

  signIn(frm){
     this.auth.signIn(frm.value.email, frm.value.password);
  }

  login(){
    this.auth.login();
  }
}
