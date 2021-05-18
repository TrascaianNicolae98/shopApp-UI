export class ProductDto{
  name: string;
  quantity: string;
  shopId: number;

  constructor(product: any = {}) {
    this.name = product.name;
    this.quantity = product.quantity;
    this.shopId = product.shopId;
  }
}
