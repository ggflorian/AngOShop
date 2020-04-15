import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getCategories(){
    const ref1 = this.db.collectionGroup('categories');
    const ref2 = this.db.firestore.collectionGroup('categories').orderBy('name');

    return this.db.collection('categories').snapshotChanges();//, ref => ref.orderBy('name'));
  };
  
}
