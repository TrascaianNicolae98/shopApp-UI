import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ButtonComponent } from './shared/button/button.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { InputComponent } from './shared/input/input.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { ChipsComponent } from './shared/chips/chips.component';
import { MiniFabComponent } from './shared/mini-fab/mini-fab.component';
import { TextareaComponent } from './shared/textarea/textarea.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AddShopDialogComponent } from './shared/add-shop-dialog/add-shop-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShopCardComponent } from './shared/shop-card/shop-card.component';
import { MatCardModule } from '@angular/material/card';
import {TokenInterceptor} from "./helper/interceptor";
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { AddProductDialogComponent } from './shared/add-product-dialog/add-product-dialog.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    CheckboxComponent,
    DatepickerComponent,
    LoginComponent,
    InputComponent,
    DropdownComponent,
    ChipsComponent,
    MiniFabComponent,
    TextareaComponent,
    HomeComponent,
    AddShopDialogComponent,
    ShopCardComponent,
    ShopDetailsComponent,
    AddProductDialogComponent,
    ProductCardComponent,
  ],
  imports: [
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
