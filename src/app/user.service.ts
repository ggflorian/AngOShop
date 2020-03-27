import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore'

import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(usr: firebase.auth.UserCredential){
    this.db.doc('/utilizatori/' + usr.user.uid).set({
      name: usr.user.displayName,
      email: usr.user.email,
      isAdmin: false,
    });
  }

  salvare(usr: firebase.User){
    this.db.doc('/utilizatori/' + usr.uid).set({
      name: usr.displayName,
      email: usr.email,
      isAdmin: false,
    });
  }

/*
  // FirebaseObjectObservable - deprecated
  get(uid: string): AngularFireObject<AppUser> { 
    return this.db.object('/utilizatori/' + uid);
  }
*/
}
