import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  product!: IProduct;
  subscription!: Subscription;
  errorMessage = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.filter(p => p.productId == id)[0];
        if (this.product) {
          this.pageTitle += `: ${this.product.productName}`;
        }
        else {
          this.onBack();
        }
      },
      error: err => this.errorMessage = err,
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
