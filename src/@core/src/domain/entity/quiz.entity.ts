import { AggregateRoot } from "src/@kernel/domain/entity/aggregate-root.interface";
import { Entity, EntityTimestamp } from "src/@kernel/domain/entity/base.entity";
import { UniqueEntityId } from "src/@kernel/domain/value-object/unique-entity-id.value-object";
import { Question } from "./question.entity";

export class Quiz extends Entity<QuizProperties> implements AggregateRoot {
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
