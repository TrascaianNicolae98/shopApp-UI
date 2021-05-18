import { Sort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';

export class QueryConfig {
  sorter: Sorter;
  pager: Pager;
  filters: any[];

  constructor(table: any = {}) {
    this.sorter = new Sorter(table.sorter);
    this.pager = new Pager(table.pager);
    this.filters = table.filters || [];
  }

  setFilter(field: string, value: string): void {
    const filterItem = this.filters.find(item => item.field === field);
    if (filterItem) {
      filterItem.value = value;
    } else {
      this.filters.push({field, value});
    }
    this.setPage(0);
  }

  setSorter(sort: Sort): void {
    this.sorter.field = sort.direction !== '' ? sort.active : '';
    this.sorter.IsSortingAscending = sort.direction === 'asc';
    this.setPage(0);
  }

  setPage(page: number): void {
    if (!this.pager) {
      return;
    }
    this.pager.page = page;
  }

  setField(field: string): void {
    if (!this.sorter) {
      return;
    }
    this.sorter.field = field;
  }

  setAscending(isAscending: boolean): void {
    if (!this.sorter) {
      return;
    }
    this.sorter.IsSortingAscending = isAscending;
  }

  resetQuery(): void {
    this.sorter = new Sorter();
    this.filters = [];
    this.setPage(0);
  }

  removeFilter(filterToRemove: string): void {
    this.filters = this.filters.filter(filter => filter.field !== filterToRemove);
  }

  appendFilter(field: string, value: string): void {
    if (!this.filters.find(f => f.field === field)){
      this.setFilter(field, value);
    }
    else{
      let filter = this.filters.find(f => f.field === field).value;
      filter += ' ' + value;
      this.setFilter(field, filter);
    }

  }
  setMultipleFilters(field: string, values: string[]): void {
    for (const value of values){
      this.filters.push({field, value});
    }
  }

  get isFirstPage(): boolean {
    return !this.pager || this.pager.page === 0;
  }

  get hasEmptyQuery(): boolean {
    return !this.filters.length;
  }
}

class Pager {

  count: number;
  pageSize: number;
  page: number;

  constructor(pager: any = {}) {
    this.count = pager.count || 0;
    this.page = pager.page || 0;
    this.pageSize = pager.pageSize || environment.defaultItemsPerPage;
  }
}

class Sorter {
  field: string;
  IsSortingAscending: boolean;

  constructor(sorter: any = {}) {
    this.field = sorter.field || '';
    this.IsSortingAscending = sorter.IsSortingAscending || false;
  }
}
