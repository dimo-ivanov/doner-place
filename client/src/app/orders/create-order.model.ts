export class CreateOrderModel {
  constructor(
    public creator: string = '',
    public product: string = '',
    public toppings: any = ''
  ) { }
}