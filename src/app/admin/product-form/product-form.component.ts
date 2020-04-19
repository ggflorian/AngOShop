import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any;
  catList: any[];
  product: Product = new Product();
  id:string;

  constructor(
    private productService: ProductService,
    categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.productService.getProduct(this.id).pipe(take(1)).subscribe(p => this.product = p); // use take(1) and async from task medium site
    }
  }

  ngOnInit(): void {
    this.categories$.subscribe(res => this.catList = res ); /* console.log('nginit-catList'); console.log(res); }); */ //
  }

  save(product){
    console.log(product);

    if (!this.id) this.productService.add(product);
    else this.productService.update(this.id, product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this record?')) return 

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
