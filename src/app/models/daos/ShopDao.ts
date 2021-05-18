export class ShopDao{
  id: number;
  name: string;
  constructor(shop: any = {}) {
    this.id = shop.id;
    this.name = shop.name;
  }
}
