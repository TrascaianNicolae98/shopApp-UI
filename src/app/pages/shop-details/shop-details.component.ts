import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { ShopDetailsDao } from '../../models/daos/ShopDetailsDao';
import { AddShopDialogComponent } from '../../shared/add-shop-dialog/add-shop-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDto } from '../../models/dtos/ProductDto';
import { AddProductDialogComponent } from '../../shared/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  shopId = null;
  shopDetails: ShopDetailsDao;

  constructor(private route: ActivatedRoute, private shopService: ShopService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.shopId = +data.shopId;
      this.getShopDetails();
    });
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.shopService.addProduct(new ProductDto({name: result.name, quantity: result.quantity, shopId: this.shopId})).subscribe(data => {debugger;
        console.log(data)
        this.getShopDetails();
      });
    });
  }

  deleteProduct(data: any): void {
    this.shopService.deleteProduct(data.id).subscribe(data=>{this.getShopDetails()});
  }


  deleteAllProducts(): void {
    this.shopService.deleteAllProducts(this.shopId).subscribe(data=>{this.getShopDetails()});
  }

  private getShopDetails(): void {

    this.shopService.getById(this.shopId).subscribe(shop => {debugger;
      this.shopDetails = new ShopDetailsDao({shopName: shop.shopName, products: shop.productDtos});
    });
  }

}
