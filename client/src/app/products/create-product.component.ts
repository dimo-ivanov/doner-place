import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Router } from '@angular/router';

import { CreateProductModel } from './create-product.model';
import { ProductsActions } from '../store/products/products.actions';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent {
  product: CreateProductModel = new CreateProductModel();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private productsActions: ProductsActions,
    private router: Router
  ) { }

  createProduct() {
    this.productsActions.createProduct(this.product);
    let subscription = this.ngRedux
      .select(state => state.products)
      .subscribe(products => {
        if (products.productAdded) {
          const id = products.productAddedId;
          subscription.unsubscribe();

          this.router.navigateByUrl('');
        }
      });
  }
}