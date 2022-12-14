import {
    Entity,
    AggregateRoot,
    EntityTimestamp,
    UniqueEntityId,
} from "src/@kernel/domain";
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
    updateValues(props: Pick<QuizProperties, "title">): void {
        this.title = props.title;

        this.validate();
        this.update();
    }
    addQuestion(question: Question): void {
        this.props.questions.push(question);

        this.validate();
        this.update();
    }
    get title(): string {
        return this.props.title;
    }
    private set title(v: string) {
        this.props.title = v;
    }
    get questions(): Question[] {
        return this.props.questions;
    }
    private set questions(v: Question[]) {
        this.props.questions = v;
    }
}

export type QuizProperties = EntityTimestamp & {
    title: string;
    questions: Question[];
};
