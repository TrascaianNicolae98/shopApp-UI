import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChipsModel } from './chips.model';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsComponent,
      multi: true
    }
  ]
})

export class ChipsComponent implements ControlValueAccessor, OnInit, OnChanges {

  /**
   * Computed the logical difference between the input 'allRecords'
   * list which contains all the records, and the records that are
   * selected. This allows for the elimination of duplicate autocomplete options
   */

  get diffList(): any {
    if (this.records.length === 0){
      return this.allRecords;
    }
    return _.differenceBy(this.allRecords, this.records, 'name');
  }

  @Input() formControl: FormControl;
  @Input() allRecords: ChipsModel<any>[] = [];
  @Input() label: string;
  @Input() showErrors = false;
  @Input() required = false;
  @Input() hasAvatar = true;

  @Output() newRecord: EventEmitter<any> = new EventEmitter();

  records: ChipsModel<any>[] = [];
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRecords: Observable<any[]>;
  recordControl = new FormControl();


  @ViewChild('chipsInput', {static: false}) recordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private onChangeCallback: (_: any) => {};
  private onTouchedCallback: (_: any) => {};

  constructor() {
    this.filteredRecords = this.recordControl.valueChanges.pipe(
      map((record: string | null) => {
          return record ? this._filter(record) : this.diffList;
        }
      ));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if (!this.allRecords || this.allRecords.length === 0) {
          this.records.push(new ChipsModel({name: value}));
        } else {
          const chipOption = this.allRecords.find(record => record?.name === value);
          if (chipOption) {
            this.records.push(chipOption);
          }
        }

        this.newRecord.emit(value);
        // Check if the added value already exists
      }

      // Reset the input value
      this.resetAutocompleteInput(input);

      this.recordControl.setValue(null);
      this.onChangeCallback(this.records);
    }
  }

  remove(record: ChipsModel<any>): void {
    const index = this.records.indexOf(record);

    if (index >= 0) {
      const recordsCopy = [... this.records];
      recordsCopy.splice(index, 1);
      this.records = recordsCopy;
      this.onChangeCallback(this.records);
    }
    this.recordControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const recordsCopy = [... this.records];
    recordsCopy.push(this._filter(event.option.viewValue)[0]);
    this.records = recordsCopy;
    this.recordInput.nativeElement.value = '';
    this.recordControl.setValue(null);
    this.onChangeCallback(this.records);
    this.recordInput.nativeElement.blur();
    setTimeout(() => {
      this.recordInput.nativeElement.focus();
    });
  }

  writeValue(value: any): void {
    if (value !== null) {
      this.records = value;
      this.recordControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
    }
  }

  registerOnChange(fn): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn): void {
    this.onTouchedCallback = fn;
  }

  display(record: ChipsModel<any>): string {
    return record.name;
  }

  ngOnInit(): void {
    this.recordControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allRecords && this.allRecords) {
      setTimeout(() => {
        this.recordControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
      });
    }
  }

  private _filter(value: any): ChipsModel<any>[] {
    let filterValue;
    if (value.type === 'chips-model') {
      filterValue = value.name;
    } else {
      if (typeof value === 'string') {
        filterValue = value.toLowerCase();
      }
    }
    return this.diffList.filter(record => record?.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private resetAutocompleteInput(input: HTMLInputElement): void {
    if (input) {
      input.value = '';
    }
  }

  isDisabled(): boolean {
    return this.formControl?.disabled;
  }
}
