import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-mini-fab',
  templateUrl: './mini-fab.component.html',
  styleUrls: ['./mini-fab.component.scss']
})
export class MiniFabComponent {

  @Input() label: string;
  @Input() type: string;
  @Input() color: ThemePalette;
  @Output() clicked = new EventEmitter<any>();
  @Input() isDisabled = false;

  constructor() {
  }

  onClicked(event): void {
    this.clicked.emit(event);
  }
}
