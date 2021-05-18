import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-shop-dialog',
  templateUrl: './add-shop-dialog.component.html',
  styleUrls: ['./add-shop-dialog.component.css']
})
export class AddShopDialogComponent implements OnInit {

  nameFormControl: FormControl;
  @Output() emitAddShop = new EventEmitter<any>();

  constructor(private dialogRef: MatDialogRef<AddShopDialogComponent>) {
  }

  ngOnInit(): void {
    this.nameFormControl = new FormControl('', Validators.required);
  }

  addShop(): void {
    if(this.nameFormControl.valid) {
      this.dialogRef.close(this.nameFormControl.value);
    }
  }
}
