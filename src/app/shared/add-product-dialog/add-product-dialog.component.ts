import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  productFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  ngOnInit(): void {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });
  }

  addProduct(): void {
    this.dialogRef.close(this.productFormGroup.value);
  }
}
