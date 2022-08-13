import { Question, Quiz } from "src/quiz/domain";
import { QuizOutput } from "./quiz-output.dto";

export class QuizOutputMapper {
    static toOutput(quiz: Quiz): QuizOutput {
        return {
            id: quiz.id.value,
            title: quiz.title,
            questions: QuizOutputMapper.questionsToOutput(quiz.questions),
            createdAt: quiz.createdAt,
            updatedAt: quiz.updatedAt,
        };
    }
    static questionsToOutput(questions: Question[]): QuizOutput["questions"] {
        return questions.map(question => ({
            id: question.id.value,
            title: question.title,
            correctAnswer: question.correctAnswer,
            answers: question.answers.map(answer => ({ ...answer.value })),
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        }));
    }
}
