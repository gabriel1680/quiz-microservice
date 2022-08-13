import { DefaultUseCase } from "src/@kernel/application/use-case";
import { GetRepository } from "src/@kernel/domain";
import { Quiz } from "src/quiz/domain";
import { QuizOutputMapper } from "../../dto/quiz-output.mapper";
import { FindQuizByIdInput, FindQuizByIdOutput } from "./dto";

export class FindQuizByIdUseCase
    implements DefaultUseCase<FindQuizByIdInput, FindQuizByIdOutput>
{
    constructor(private readonly repository: GetRepository<Quiz>) {}

    async execute(input: FindQuizByIdInput): Promise<FindQuizByIdOutput> {
        const quiz = await this.repository.get(input.id);
        return QuizOutputMapper.toOutput(quiz);
    }
}
