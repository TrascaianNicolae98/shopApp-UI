import { ProductDao } from './Product';

export class ShopDetailsDao{
  shopName: string;
  products: ProductDao[];

  constructor(shopDetails: any = {}){
    debugger;
    this.shopName = shopDetails.shopName;
    this.products = shopDetails.products;
  }
}
