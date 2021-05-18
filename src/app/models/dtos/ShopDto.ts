export class ShopDto{
  userId: number;
  name: number;
  constructor(shop: any = {}) {
    this.userId = shop.userId;
    this.name = shop.name;
  }
}
