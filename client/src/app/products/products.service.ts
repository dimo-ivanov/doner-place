import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService
  ) { }

  getAll () {
    return this.httpService.get('');
  }

  create (product) {
    return this.httpService.post('products/create', product);
  }

  edit (product) {
    return this.httpService.post(`products/edit/${product._id}`, product);
  }

  deleteProduct (id) {
    return this.httpService.post(`products/delete/${id}`, {});
  }
}