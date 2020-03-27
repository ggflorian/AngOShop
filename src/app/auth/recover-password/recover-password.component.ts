import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  emailInput: string = "y1qaz11@yahoo.com (y1qaz11)";

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword(){
    // console.log("user email: " + this.emailInput);

    if (this.emailInput != "")
    {
      this.auth.sendPassResetEmail(this.emailInput)
      alert("Email has been sent to you. Please check and verify your mail-address.")
    }
    else
      alert("Hey, please enter your email first");
  }

}
