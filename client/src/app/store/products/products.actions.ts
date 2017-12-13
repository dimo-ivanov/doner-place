import { Injectable } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../index';

export const PRODUCTS_ALL = 'products/ALL';
export const CREATE_PRODUCT = 'products/CREATE';
export const EDIT_PRODUCT = 'products/EDIT';
export const DELETE_PRODUCT = 'products/DELETE';

@Injectable()
export class ProductsActions {
  constructor(
    private productsService: ProductsService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  getAll () {
    this.productsService
      .getAll()
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: PRODUCTS_ALL,
          result
        });
      });
  }

  createProduct (product) {
    this.productsService
      .create(product)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CREATE_PRODUCT,
          result
        });
      });
  }

  editProduct (product) {
    this.productsService
      .edit(product)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: EDIT_PRODUCT,
          result
        });
      });
  }

  deleteProduct (id) {
    this.productsService
      .deleteProduct(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: DELETE_PRODUCT,
          result
        });
      });
  }
}