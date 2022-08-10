import { DefaultUseCase } from "src/@kernel/application/use-case";
import { CreateRepository } from "src/@kernel/domain";
import { Quiz, QuizFactory } from "src/quiz/domain";

export class CreateQuizUseCase
    implements DefaultUseCase<CreateQuizInput, CreateQuizOutput>
{
    constructor(private readonly repository: CreateRepository<Quiz>) {}

    async execute(input: CreateQuizInput): Promise<void> {
        const quiz = QuizFactory.create(input);
        await this.repository.create(quiz);
    }
}

export type CreateQuizInput = {
    title: string;
    questions: {
        title: string;
        correctAnswer: string;
        answers: {
            id: string | number;
            text: string;
        }[];
    }[];
};

export type CreateQuizOutput = void;
