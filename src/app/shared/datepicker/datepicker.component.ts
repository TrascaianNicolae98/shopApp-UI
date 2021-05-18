import {Component, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, Validators} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() dateForm: FormControl;
  @Input() color: ThemePalette;
  @Input() isDisabled = false;
  @Output() selectionChange = new EventEmitter<any>();
  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  onSelectionChange(event: any): void {
    this.dateForm.setValue(event.value);
    this.selectionChange.emit(event.value);
  }

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onSaveProject(): void {
  }

  writeValue(obj: any): void {
  }
}
