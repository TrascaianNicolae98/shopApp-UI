import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../environments/environment';
import { ShopDto } from '../models/dtos/ShopDto';
import { ProductDto } from '../models/dtos/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private url = urls.shopUrl;  // URL to web api
  private urlProduct = urls.productUrl;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addShop(id: number, name: string): any {
    return this.http.post(this.url, new ShopDto({userId: id, name}));
  }

  getShops(id: number): any {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteShop(id: number): any {
    return this.http.post(`${this.url}/${id}`, 1);
  }

  getById(id: number): any {
    return this.http.get(`${this.urlProduct}/${id}`);
  }

  addProduct(productDto: ProductDto) {
    return this.http.post(`${this.urlProduct}`, productDto);
  }

  deleteProduct(id: number): any {
    return this.http.post(`${this.urlProduct}/${id}`, 1);
  }

  deleteAllProducts(id: number): any {
    return this.http.post(`${this.urlProduct}/all/${id}`, 1);

  }
}
