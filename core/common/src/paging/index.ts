export interface PagingResult<T> {
  list: T[];
  pageNumber: number;
  pageSize: number;
  total: number;
}
