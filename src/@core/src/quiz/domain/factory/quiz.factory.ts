import { UniqueEntityId } from "src/@kernel/domain/";
import { Quiz } from "../entity";
import { QuestionFactory, QuestionProps } from "./question.factory";

export class QuizFactory {
    static create(props: QuizProps): Quiz {
        return new Quiz(
            {
                title: props.title,
                questions: props.questions.map(QuestionFactory.create),
                createdAt: props.createdAt,
                updatedAt: props.updatedAt,
            },
            props.id ? UniqueEntityId.create(props.id) : null,
        );
    }
}

export type QuizProps = {
    id?: string;
    title: string;
    questions: QuestionProps[];
    createdAt?: Date;
    updatedAt?: Date;
};
