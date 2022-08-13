import { Entity } from "../entity";

export class SearchResult<E extends Entity = Entity, F = string> {
    readonly items: E[];
    readonly total: number;
    readonly currentPage: number;
    readonly perPage: number;
    readonly lastPage: number;
    readonly sort: string | null;
    readonly sortDir: string | null;
    readonly filter: F;

    constructor(props: SearchResultProps<E, F>) {
        this.items = props.items;
        this.total = props.total;
        this.currentPage = props.currentPage;
        this.perPage = props.perPage;
        this.lastPage = Math.ceil(this.total / this.perPage);
        this.sort = props.sort;
        this.sortDir = props.sortDir;
        this.filter = props.filter;
    }

    toJSON() {
        return {
            items: this.items,
            total: this.total,
            currentPage: this.currentPage,
            perPage: this.perPage,
            lastPage: this.lastPage,
            sort: this.sort,
            sortDir: this.sortDir,
            filter: this.filter,
        };
    }
}

type SearchResultProps<E extends Entity, F> = {
    items: E[];
    total: number;
    currentPage: number;
    perPage: number;
    sort: string | null;
    sortDir: string | null;
    filter: F | null;
};
