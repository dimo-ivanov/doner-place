import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsService } from './products.service';
import { ProductsActions } from '../store/products/products.actions';

import { ProductsListComponent } from './products-list.component';
import { CreateProductComponent } from './create-product.component';
import { EditProductComponent } from './edit-product.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  providers: [
    ProductsService,
    ProductsActions
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ProductsModule {

}