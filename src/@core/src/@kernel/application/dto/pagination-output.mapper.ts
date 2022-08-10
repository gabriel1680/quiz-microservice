import { SearchResult } from "src/@kernel/domain";
import { PaginationOutputDto } from "./pagination-output.dto";

export class PaginationOutputMapper {
    static toOutput<I = any>(items: I[], result: SearchResult): PaginationOutputDto<I> {
        return {
            items,
            total: result.total,
            currentPage: result.currentPage,
            lastPage: result.lastPage,
            perPage: result.perPage,
        };
    }
}
