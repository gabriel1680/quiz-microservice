import { PaginationOutputMapper } from "src/@kernel/application/dto";
import { DefaultUseCase } from "src/@kernel/application/use-case";
import { SearchRepository, SearchResult } from "src/@kernel/domain";
import { Quiz } from "src/quiz/domain";
import { SearchQuizParams } from "src/quiz/domain/repository/quiz.search-params";
import { QuizOutputMapper } from "../../dto/quiz-output.mapper";
import { SearchQuizInput, SearchQuizOutput } from "./dto";

export class SearchQuizUseCase
    implements DefaultUseCase<SearchQuizInput, SearchQuizOutput>
{
    constructor(private readonly repository: SearchRepository<Quiz>) {}

    async execute(input: SearchQuizInput): Promise<SearchQuizOutput> {
        const params = new SearchQuizParams(input);
        const result = await this.repository.search(params);
        return this.toOutput(result);
    }
    private toOutput(result: SearchResult<Quiz, string>): SearchQuizOutput {
        const quizzes = result.items.map(QuizOutputMapper.toOutput);
        return PaginationOutputMapper.toOutput(quizzes, result);
    }
}
