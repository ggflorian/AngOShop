import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<firebase.User>;
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth, 
    //private db: AngularFirestore, 
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    this.user$ = afAuth.authState;
  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.eventAuthError.next(err);
      })
      .then(userCredential => {
        if (userCredential){
          let retUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          localStorage.setItem('rtrUrl', retUrl);
        }        
      })
  }
/*
  createUser(user)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({displayName: user.firstName + ' ' + user.lastName });
        this.insertUserData(userCredential).then(() => this.router.navigate['/home']);
      })
      .catch(err => {
        this.eventAuthError.next(err);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`utilizatori/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user',
      isAdmin: false
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  sendPassResetEmail(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Reset password link has been succesfully sent to you!")
        this.router.navigate(['/home']);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }
  */
}
