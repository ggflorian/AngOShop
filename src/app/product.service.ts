import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) {}
  
  getAll(){
    return this.db.collection('products').snapshotChanges();
  }

  create(product){ 
    return this.db.collection('/products').add(product);
  }

  get(productId){
    return this.db.collection('/products/'+productId);
  }

}
