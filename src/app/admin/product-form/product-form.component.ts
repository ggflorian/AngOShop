import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  catList: any[];
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
    //if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
    this.categories$.subscribe(res => { console.log('nginit-catList'); console.log(res); this.catList = res });
  }

  save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){

  }
}
