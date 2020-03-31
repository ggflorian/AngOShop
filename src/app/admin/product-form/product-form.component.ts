import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(
    private productService: ProductService,
    categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    //if (this.id) this.productService.get2(this.id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  }

  save(product){
    console.log(product);
    this.productService.create(product);
  }

  delete(){

  }
}
