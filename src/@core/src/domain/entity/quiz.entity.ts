import { AggregateRoot } from "src/@kernel/domain/entity/aggregate-root.interface";
import { Entity, EntityTimestamp } from "src/@kernel/domain/entity/base.entity";
import { UniqueEntityId } from "src/@kernel/domain/value-object/unique-entity-id.value-object";
import { EntityValidationError, Question } from "./question.entity";

export class Quiz extends Entity<QuizProperties> implements AggregateRoot {
    constructor(props: QuizProperties, id?: UniqueEntityId) {
        super(props, id);

        this.validate();
    }
    validate(): void {
        if (!this.title || typeof this.title !== "string")
            throw new EntityValidationError(
                "The field 'title' is required and must be type string",
            );

        if (!this.questions || !Array.isArray(this.questions))
            throw new EntityValidationError(
                "The field 'questions' is required and must be type array",
            );

        this.questions.forEach(question => {
            if (!(question instanceof Question))
                throw new EntityValidationError(
                    "The field 'questions' is required and must be type Question",
                );
        });

        if (this.questions.length < 2)
            throw new EntityValidationError(
                "To create a quiz is necessary at least 2 questions",
            );
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
