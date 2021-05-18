import {Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})
export class ButtonComponent {
  @Input() label: string;
  @Input() type: string;
  @Input() iconToShow: string;
  @Input() color: ThemePalette;
  @Output() clicked = new EventEmitter<any>();
  @Input() isDisabled = false;

  constructor(private elementRef: ElementRef) {
  }

  onClicked(event): void {
    this.clicked.emit(event);
  }

  public getElementRef(): ElementRef{
    return this.elementRef;
  }

}
