import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<firebase.User>;
  usr$: Observable<AppUser>
  newUser: any;
  appUserAdmin: AppUser;
  appUserRegular: AppUser;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    this.user$ = afAuth.authState;
  }

  get appUsr$() : Observable<AppUser> {

    return this.afAuth.authState.pipe(
      switchMap(usr => {
        if (usr) {
          //console.log('auth1'); console.log(usr.uid);
          return this.db.doc<AppUser>('/utilizatori/'+usr.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    // this.appUserAdmin = { name: 'Florian', email: 'florian@yahoo.com', isAdmin: true };
    // return of(this.appUserAdmin);

    // this.appUserRegular = { name: 'Anghel', email: 'anghel@yahoo.com', isAdmin: false };
    // //return of(this.appUserRegular);

    // return of(null);

  }

  getUserState() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  login(){
    let retUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('rtrUrl', retUrl);

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); //.signInWithRedirect
  }

  signIn(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.eventAuthError.next(err);
      })
      .then(userCredential => {
        if (userCredential){
          let retUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          localStorage.setItem('rtrUrl', retUrl);

          this.router.navigate([retUrl]);
        }        
      })
  }

  createUser(userFrm)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(userFrm.email, userFrm.password)
      .then(userCredential => {
        this.newUser = userFrm;
        userCredential.user.updateProfile({displayName: userFrm.firstName + ' ' + userFrm.lastName });
        this.insertUserData(userCredential).then(() => this.router.navigate['/home']);
      })
      .catch(err => {
        this.eventAuthError.next(err);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    //console.log('insertUserData1'); console.log(userCredential); console.log(this.newUser);
    return this.db.doc('/utilizatori/'+userCredential.user.uid).set({
      email: this.newUser.email,
      name: this.newUser.firstName + ' ' + this.newUser.lastName,
      isAdmin: false
    });
  }

  sendPassResetEmail(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("Reset password link has been succesfully sent to you!")
        this.router.navigate(['/']);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }


  /*
  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) 
          return this.userService.get(user.uid)
        }));

        return Observable.of(null);
  };
  */
}


