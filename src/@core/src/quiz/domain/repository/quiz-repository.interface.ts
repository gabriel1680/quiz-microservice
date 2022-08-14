import { DefaultRepository, SearchRepository } from "src/@kernel/domain";
import { Quiz } from "../entity";
import { SearchQuizParams } from "./quiz.search-params";
import { QuizSearchResult } from "./quiz.search-result";

export interface QuizRepository
    extends DefaultRepository<Quiz>,
        SearchRepository<Quiz, string, SearchQuizParams, QuizSearchResult> {}
