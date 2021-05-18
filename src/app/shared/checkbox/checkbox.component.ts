import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {CheckboxControlValueAccessor, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {

  @ViewChild('nativeElement', {static: false}) nativeElement: ElementRef<any>;

  @Input() label;
  @Input() color: ThemePalette;
  @Input() labelPosition;
  @Input() name;
  @Input() control: FormControl;
  @Input() isDisabled = false;

  @Input()
  set value(value) {
    this.checkboxValue = value;
    this.control.setValue(value);
    this.changed.emit(value);
  }

  get value(): any {
    return this.checkboxValue;
  }

  @Output()
  changed: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();

  @Output()
  indeterminateChange: EventEmitter<boolean>;

  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  private checkboxValue;
  private editable = false;

  @HostBinding('class.editable') get isEditable(): boolean {
    return this.editable;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef, 'disabled', isDisabled);
  }

  writeValue(value: MatCheckboxChange): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  onChange(value: MatCheckboxChange): void {
    this.control.setValue(value.checked);
    this.changed.emit(value);
    console.log(value.checked);
  }
}

