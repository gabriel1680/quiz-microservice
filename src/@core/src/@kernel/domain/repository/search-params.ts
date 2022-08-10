export class SearchParams<F = string> {
    private _page: number;
    private _perPage = 15;
    private _sort: string | null;
    private _sortDir: SortDirection | null;
    private _filter: F | null;

    constructor(props: SearchProps<F> = {}) {
        this.page = props.page;
        this.perPage = props.perPage;
        this.sort = props.sort;
        this.sortDir = props.sortDir;
        this.filter = props.filter;
    }

    get page(): number {
        return this._page;
    }
    private set page(value: number) {
        let _page = +value;

        if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
            _page = 1;
        }

        this._page = _page;
    }
    get sortDir(): SortDirection | null {
        return this._sortDir;
    }
    private set sortDir(value: SortDirection | null) {
        if (!this.sort) {
            this._sortDir = null;
            return;
        }
        const dir = `${value}`.toUpperCase();
        this._sortDir = (dir !== "ASC" && dir !== "DESC" ? "ASC" : dir) as SortDirection;
    }
    get sort(): string | null {
        return this._sort;
    }
    private set sort(value: string | null) {
        this._sort =
            value === null || value === undefined || value === "" ? null : `${value}`;
    }
    get perPage() {
        return this._perPage;
    }
    private set perPage(value) {
        let _perPage = value === (true as any) ? this._perPage : +value;

        if (
            Number.isNaN(_perPage) ||
            _perPage <= 0 ||
            parseInt(_perPage as any) !== _perPage
        ) {
            _perPage = this._perPage;
        }

        this._perPage = _perPage;
    }
    get filter(): F | null {
        return this._filter;
    }
    private set filter(value: F | null) {
        this._filter =
            value === null || value === undefined || (value as unknown) === ""
                ? null
                : typeof value !== "object"
                ? (`${value}` as any)
                : value;
    }
}

export type SearchProps<F = string> = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    sortDir?: SortDirection | null;
    filter?: F | null;
};

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}
