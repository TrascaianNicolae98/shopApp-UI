import { HttpParams } from '@angular/common/http';
import { QueryConfig } from './query-config.utils/query-config.utils.component';

export class AppUtils {

  static buildPageableParams(config: QueryConfig): HttpParams {
    let params = new HttpParams();

    if (config) {
      params = params.set('page', `${config.pager.page}`);
      params = params.set('pageSize', `${config.pager.pageSize}`);
      if (config.sorter.field) {
        params = params.set('SortColumn', `${config.sorter.field}`);
        params = params.set('IsAsc', `${config.sorter.IsSortingAscending}`);
      }

      config.filters.forEach(filter => {
        if ((filter.value !== 'All' && filter.value !== 'ALL') && filter.value) {
          params = params.set(filter.field, filter.value);
        }
      });
    }
    return params;
  }

  static buildPageableParamsFromList(config: QueryConfig): HttpParams {
    let params = new HttpParams();

    if (config) {
      params = params.set('page', `${config.pager.page}`);
      params = params.set('pageSize', `${config.pager.pageSize}`);
      if (config.sorter.field) {
        params = params.set('SortColumn', `${config.sorter.field}`);
        params = params.set('IsAsc', `${config.sorter.IsSortingAscending}`);
      }

      config.filters.forEach(filter => {
        if (filter.value) {
          params = params.append(filter.field, filter.value);
        }
      });
    }
    return params;
  }

  static buildQueryParams(queryParams: []): HttpParams {
    let params = new HttpParams();

    if (queryParams.length > 0) {
      queryParams.forEach((qp: any) => {
        if (qp.value) {
          params = params.append(qp.field, qp.value);
        }
      });
    }

    return params;
  }

  static isEmptyObject(obj): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
