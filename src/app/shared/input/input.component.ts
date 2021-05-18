import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],

})
export class InputComponent implements ControlValueAccessor {

  @Input()
  set value(value) {
    this.inputValue = value;

    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }
    this.inputChange.emit(value);
  }

  get value() {
    return this.inputValue;
  }

  @HostBinding('class.editable') get isEditable() {
    return this.editable;
  }

  @HostBinding('class.reactive') get isReactive() {
    return this.reactive;
  }

  get hasError() {
    return this.formControl && this.formControl.errors && this.showErrors;
  }

  @ViewChild('nativeElem', {static: false}) nativeElement: ElementRef<any>;

  @Input() id;
  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Input() isSearch = false;
  @Input() type = 'text';
  @Input() label;
  @Input() formControl: FormControl;
  @Input() showErrors = false;
  @Input() required = false;
  @Input() reactive = false;
  @Input() forceUpperCase = false;
  @Input() hintMessage: string;
  @Input() prefixIcon: string;

  @Output() inputChange = new EventEmitter<any>();
  editable = false;

  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  private inputValue = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {

  }

  @HostListener('blur') onBlur(): void {
    this.editable = false;
  }

  @HostListener('click') onClick(): void {
    this.editable = true;
    if (this.nativeElement) {
      this.nativeElement.nativeElement.focus();
    }
  }

  writeValue(value): void {
    this.inputValue = value;
  }

  registerOnChange(fn): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn): void {
    this.onTouchedCallback = fn;
  }

  onChange(event: any): void {
    if (event.target) {
      this.inputChange.emit(event.target.value);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef, 'disabled', isDisabled);
  }

  stepUp(): void {
    if (this.type === 'number') {
      this.formControl.setValue(+this.formControl.value + 1);
    }
  }

  stepDown(): void {
    if (this.type === 'number') {
      this.formControl.setValue(+this.formControl.value - 1);
    }
  }

  forceKeyPressUpperCase(event) {
    if (this.forceUpperCase) {
      const charInput = event.key;
      if ((charInput >= 'a') && (charInput <= 'z')) {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          const newChar = charInput.charCodeAt(0) - 32;
          const start = event.target.selectionStart;
          const end = event.target.selectionEnd;
          event.target.value = event.target.value.substring(0, start) + String.fromCharCode(newChar) +
            event.target.value.substring(end);
          event.target.setSelectionRange(start + 1, start + 1);
          event.preventDefault();
          if (this.onChangeCallback) {
            this.onChangeCallback(event.target.value);
          }
          this.inputChange.emit(event.target.value);
        }
      }
    }
  }
}
