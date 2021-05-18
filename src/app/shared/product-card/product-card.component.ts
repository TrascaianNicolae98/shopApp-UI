import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() name: string;
  @Input() quantity: string;
  @Input() id: number;

  @Output() clicked = new EventEmitter<any>();
  @Output() clickDelete  = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitClick(): void {
    this.clicked.emit({id: this.id, name: this.name});
  }

  emitDelete(): void {
    this.clickDelete.emit({id: this.id, name: this.name});
  }

}
