import { v4 as uuid, validate } from "uuid";

import { ValueObject } from "./base.value-object";

export class UniqueEntityId extends ValueObject<string> {
    private constructor(id: string) {
        super(id);
    }

    static validate(id: string): boolean {
        return validate(id);
    }

    static create(value?: string): UniqueEntityId {
        if (!value) return new UniqueEntityId(uuid());

        if (!UniqueEntityId.validate(value)) throw new Error("Invalid id");

        return new UniqueEntityId(value);
    }
}
