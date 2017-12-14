import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';

@Injectable()
export class OrdersService {
  constructor(
    private httpService: HttpService
  ) { }
  
  create (order) {
    return this.httpService.post('order/add', order);
  }

  getOrderDetails(id) {
    return this.httpService.get(`order/details/${id}`);
  }
}