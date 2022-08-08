import { Entity, EntityTimestamp } from "src/@kernel/domain/entity/base.entity";
import { UniqueEntityId } from "src/@kernel/domain/value-object/unique-entity-id.value-object";

export class Question extends Entity<QuestionProperties> {
    constructor(props: QuestionProperties, id?: UniqueEntityId) {
        super(props, id);
    }
    get title(): string {
        return this.props.title;
    }
    get correctAnswer(): string {
        return this.props.correctAnswer;
    }
    get answers(): QuestionProperties["answers"] {
        return this.props.answers;
    }
}

export type QuestionProperties = EntityTimestamp & {
    title: string;
    correctAnswer: string;
    answers: { id: string; text: string }[];
};
