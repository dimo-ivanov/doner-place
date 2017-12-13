export class CreateProductModel {
  constructor(
    public category: string = '',
    public imageUrl: string = '',
    public size: number = 0,
    public toppings: any = ''
  ) { }
}