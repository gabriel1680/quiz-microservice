import { DefaultUseCase } from "src/@kernel/application/use-case";
import { CreateRepository } from "src/@kernel/domain";
import { Quiz, QuizFactory } from "src/quiz/domain";
import { CreateQuizInput } from "./dto";

export class CreateQuizUseCase implements DefaultUseCase<CreateQuizInput, void> {
    constructor(private readonly repository: CreateRepository<Quiz>) {}

    async execute(input: CreateQuizInput): Promise<void> {
        const quiz = QuizFactory.create(input);
        await this.repository.create(quiz);
    }
}
