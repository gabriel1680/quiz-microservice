import { Entity, EntityTimestamp } from "src/@kernel/domain/entity/base.entity";
import { UniqueEntityId } from "src/@kernel/domain/value-object/unique-entity-id.value-object";

export class Quiz extends Entity<QuizProperties> {
    constructor(props: QuizProperties, id: UniqueEntityId) {
        super(props, id);
    }
    get title(): string {
        return this.props.title;
    }
    get questions(): Question[] {
        return this.props.questions;
    }
}

export type QuizProperties = EntityTimestamp & {
    title: string;
    questions: Question[];
};

export type Question = {
    title: string;
    correctAnswer: string;
    answers: Answer[];
};

export type Answer = {
    id: string;
    text: string;
};
