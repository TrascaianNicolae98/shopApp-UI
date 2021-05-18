import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {

  @Input() name: string;
  @Input() id: number;

  @Output() clicked = new EventEmitter<any>();
  @Output() clickDelete  = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitClick(): void {
    this.clicked.emit({id: this.id, name: this.name});
  }

  emitDelete() {
    this.clickDelete.emit({id: this.id, name: this.name});
  }
}
