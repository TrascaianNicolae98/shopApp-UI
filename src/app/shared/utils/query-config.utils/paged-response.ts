import { environment } from '../../../../environments/environment';

interface Item {
  [prop: string]: any;

  id?: number;
}

export class PagedResponse<T extends Item> {
  public items: T[];
  public total: number;
  public totalPages: number;

  constructor(pagedResponse: any = {}) {
    this.items = pagedResponse.items || [];
    this.total = pagedResponse.total || 0;
    this.totalPages = pagedResponse.totalPages ||
      (Math.floor(pagedResponse.total / environment.defaultItemsPerPage) +
        (pagedResponse.total % environment.defaultItemsPerPage !== 0 ? 1 : 0));
  }

  addData(data: PagedResponse<T>): PagedResponse<T> {
    if (JSON.stringify(data.items) === JSON.stringify(this.items)){
      return new PagedResponse<T>({
        items: this.items,
        total: data.total,
        totalPages: data.totalPages
      });
    }
    else {
      return new PagedResponse<T>({
        items: [...this.items, ...data.items],
        total: data.total,
        totalPages: data.totalPages
      });
    }
  }

  appendItems(items: T[]): PagedResponse<T> {
    return new PagedResponse<T>({
      items: [...this.items, ...items],
      total: this.total + items.length
    });
  }

  addItem(item: T, prepend = false): PagedResponse<T> {
    return new PagedResponse<T>({
      ...this,
      items: prepend ? [item, ...this.items] : [...this.items, item],
      total: this.total + 1
    });
  }

  updateItem(newItem: T): PagedResponse<T> {
    return new PagedResponse<T>({
      ...this,
      items: this.items.map(item => item.id === newItem.id ? newItem : item)
    });
  }

  removeItem(id: number): PagedResponse<T> {
    return new PagedResponse<T>({
      ...this,
      items: this.items.filter(item => item.id !== id),
      total: this.total - 1
    });
  }

  get isLastPage(): boolean {
    return this.items.length === this.total;
  }
}
