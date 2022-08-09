import { UniqueEntityId } from "src/@kernel/domain";
import { Question } from "../entity";
import { Answer, AnswerProps } from "../value-object";

export class QuestionFactory {
    static create(props: QuestionProps): Question {
        return new Question(
            {
                title: props.title,
                correctAnswer: props.correctAnswer,
                answers: props.answers.map(Answer.create),
                createdAt: props.createdAt,
                updatedAt: props.updatedAt,
            },
            props.id ? UniqueEntityId.create(props.id) : null,
        );
    }
}

export type QuestionProps = {
    id?: string;
    title: string;
    correctAnswer: string;
    answers: AnswerProps[];
    createdAt?: Date;
    updatedAt?: Date;
};
