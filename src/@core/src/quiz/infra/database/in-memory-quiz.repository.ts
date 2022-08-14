import { SortDirection, UniqueEntityId } from "src/@kernel/domain";
import { Quiz, QuizRepository } from "src/quiz/domain";
import { SearchQuizParams } from "src/quiz/domain/repository/quiz.search-params";
import { QuizSearchResult } from "src/quiz/domain/repository/quiz.search-result";

export class InMemoryQuizRepository implements QuizRepository {
    constructor(public quizzes: Quiz[] = []) {}

    async create(entity: Quiz): Promise<void> {
        this.quizzes.push(entity);
    }
    async get(id: string | UniqueEntityId): Promise<Quiz> {
        const quizEntity = this.quizzes.find(quiz => quiz.id.value === `${id}`);
        if (!quizEntity) throw new Error();
        return quizEntity;
    }
    sortableFields: string[] = ["createdAt", "updatedAt", "title"];
    async search(params: SearchQuizParams): Promise<QuizSearchResult> {
        const filteredQuizzes = this.quizzes.filter(quiz =>
            quiz.title.includes(params.filter),
        );

        const sortedQuizzes = await this.applySort(
            filteredQuizzes,
            params.sort,
            params.sortDir,
        );

        const paginatedQuizzes = await this.applyPaginate(
            sortedQuizzes,
            params.page,
            params.perPage,
        );

        return new QuizSearchResult({
            currentPage: params.page,
            filter: params.filter,
            items: paginatedQuizzes,
            perPage: params.perPage,
            sort: params.sort,
            sortDir: params.sortDir,
            total: paginatedQuizzes.length,
        });
    }

    private async applySort(
        items: Quiz[],
        sort: string | null,
        sortDir: SortDirection | null,
    ): Promise<Quiz[]> {
        if (!sort || !this.sortableFields.includes(sort)) return items;
        return [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort]) return sortDir === "ASC" ? -1 : 1;
            if (a.props[sort] > b.props[sort]) return sortDir === "ASC" ? 1 : -1;
            return 0;
        });
    }

    private async applyPaginate(
        items: Quiz[],
        page: SearchQuizParams["page"],
        perPage: SearchQuizParams["perPage"],
    ): Promise<Quiz[]> {
        const start = (page - 1) * perPage;
        const limit = start + perPage;
        return items.slice(start, limit);
    }
}
