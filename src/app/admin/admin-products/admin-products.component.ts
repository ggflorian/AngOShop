import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAction } from '@angular/fire/database';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  listProd1: Product[];
  listProd2;

  subscription1: Subscription;
  subscription2: Subscription;

  constructor(private productService: ProductService) { 

    this.subscription1 = this.productService.getAll().subscribe(data => 
      this.listProd1 = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Product
        } as Product
      }));

      this.listProd2 = this.productService.getAll().subscribe(data => this.listProd2 = data);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
