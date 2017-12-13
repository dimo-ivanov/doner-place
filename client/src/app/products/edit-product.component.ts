import { Component, OnInit } from '@angular/core';
import { CreateProductModel } from './create-product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { ProductsActions } from '../store/products/products.actions';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  product: CreateProductModel = new CreateProductModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private productActions: ProductsActions
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = params['id'];

        this.ngRedux
          .select(state => state.products.allProducts)
          .subscribe(products => {
            for (let category in products) {
              const searchedProduct = products[category].filter(product => product._id == id)[0];
              if (searchedProduct) {
                this.product = Object.assign({}, searchedProduct);
                this.product.toppings = this.product.toppings.join(', ');
                return;
              }
            }
          });
      });
  }

  saveProduct() {
    this.productActions.editProduct(this.product);
    this.router.navigateByUrl('');
  }
}