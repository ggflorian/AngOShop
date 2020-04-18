import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { Product } from './models/product.model';

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
    return this.db.collection('/products/'+productId); // .doc(productId).get();
  }

  getProduct(pId) {
    let s: Subject<Product> = new Subject();

    this.db.collection('products').doc(pId).get().subscribe(
      next => {
        s.next(next.data() as Product);
      }
    );

    return s as Observable<Product>;
  }

}
