export class ProductDao{
  id: number;
  name: string;
  quantity: string;

  constructor(product: any = {}) {
    this.id = product.id;
    this.name = product.name;
    this.quantity = product.quantity;
  }
}
