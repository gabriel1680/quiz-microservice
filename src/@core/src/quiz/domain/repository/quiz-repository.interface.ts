import { DefaultRepository, SearchRepository } from "src/@kernel/domain";
import { Quiz } from "../entity";

export interface QuizRepository extends DefaultRepository<Quiz>, SearchRepository<Quiz> {}
