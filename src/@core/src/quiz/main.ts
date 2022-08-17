import { CreateQuizUseCase, FindQuizByIdUseCase, SearchQuizUseCase } from "./application";
import { QuizRepository } from "./domain";
import { InMemoryQuizRepository } from "./infra";

export const quizModule: QuizModule = new (function () {
    this.repository = new InMemoryQuizRepository();
    this.create = new CreateQuizUseCase(this.repository);
    this.findById = new FindQuizByIdUseCase(this.repository);
    this.search = new SearchQuizUseCase(this.repository);
})();
export type QuizModule = {
    repository: QuizRepository;
    create: CreateQuizUseCase;
    findById: FindQuizByIdUseCase;
    search: SearchQuizUseCase;
};
