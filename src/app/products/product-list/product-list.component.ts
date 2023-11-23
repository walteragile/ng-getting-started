import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Product list";
  imageWidth = 50;
  imageMargin = 2;
  imagesAreShown = false;
  errorMessage = '';
  subscription!: Subscription;
  
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductsService) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }

  toggleImage(): void {
    this.imagesAreShown = !this.imagesAreShown;
  }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list' + message;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
