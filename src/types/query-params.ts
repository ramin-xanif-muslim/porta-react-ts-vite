export interface SortOption {
  selector: string;
  desc: boolean;
}

export interface BaseFilters {
  searchText: string;
}
export interface LookupFilters {
  searchText: string;
}

export interface BaseQueryParams<T = BaseFilters> {
  requireTotalCount?: boolean;
  isCountQuery?: boolean;
  skip?: number;
  take?: number;
  sort?: SortOption[];
  filters?: T;
}
