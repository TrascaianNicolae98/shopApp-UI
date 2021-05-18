import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Custom implementation of a textarea. This textarea is disabled by default, and it is re-enabled
 * upon clicking it. It becomes disabled again once it is focused out.
 */

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true
    }
  ],
})
export class TextareaComponent implements ControlValueAccessor {


  @HostBinding('class.editable') get isEditable(): boolean {
    return this.editable;
  }

  @HostBinding('class.reactive') get isReactive(): boolean {
    return this.reactive;
  }


  get value(): string {
    return this.inputValue;
  }

  set value(value) {
    this.inputValue = value;

    this.onChangeCallback(value);
    this.inputChange.emit(value);
  }

  @ViewChild('textarea', {static: false}) textArea: ElementRef;

  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() dataLength;
  @Input() maxLength = 300;
  @Input() showValidations = false;
  @Input() isReadOnly = false;
  @Input() isDisabled = false;
  @Input() enableOnClickMode = false;
  @Input() reactive = true;
  @Input() minRows = 1;
  @Input() maxRows = 5;

  @Output() inputChange = new EventEmitter<any>();
  @Output() toggleDisable = new EventEmitter<any>();

  editable = false;
  hovered = false;

  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  private inputValue = '';

  @HostListener('blur') onBlur(): void{
    this.editable = false;
  }


  @HostListener('click') onClick(): void {
    this.editable = true;
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

  enable(): void {
    if (this.enableOnClickMode) {
      this.formControl.enable();
      this.textArea.nativeElement.focus();
      this.toggleDisable.emit({type: 'enable', value: this.formControl.value});
    }
  }

  disable(): void {
    if (this.enableOnClickMode) {
      this.formControl.disable();
      this.toggleDisable.emit({type: 'disable', value: this.formControl.value});
    }
  }

  onMouseEnter(): void {
    this.hovered = true;
  }

  onMouseExit(): void {
    this.hovered = false;
  }

  get showErrors(): boolean {
    return this.showValidations || (this.formControl?.invalid && this.formControl?.touched);
  }

}
