import { PaginationOutputDto } from "src/@kernel/application/dto";
import { QuizOutput } from "src/quiz/application/dto";

export type SearchQuizOutput = PaginationOutputDto<QuizOutput>;
