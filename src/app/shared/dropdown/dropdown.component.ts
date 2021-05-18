import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ]
})

export class DropdownComponent implements ControlValueAccessor {
  @Input() listOfThingsToShow: Array<string>;
  @Input() title: string;
  @Input() formControl: FormControl;
  @Output() selectionChange = new EventEmitter<any>();
  @Input() color: ThemePalette;
  @Output() openedChange = new EventEmitter<boolean>();

  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  private selectedItem: any;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {

  }

  onOpened(): void{
    this.openedChange.emit();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.formControl.setValue(event.source.value);
    this.selectedItem = event.source.value;
    this.selectionChange.emit(event.source.value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef, 'disabled', isDisabled);
  }

  writeValue(obj: any): void {
    this.selectedItem = obj;
  }

  get value(): any {
    return this.selectedItem;
  }
}
