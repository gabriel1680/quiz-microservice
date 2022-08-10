export type PaginationOutputDto<I = any> = {
    items: I[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
};
