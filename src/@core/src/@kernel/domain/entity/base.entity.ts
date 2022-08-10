import { UniqueEntityId } from "../value-object/unique-entity-id.value-object";

export abstract class Entity<T extends EntityTimestamp = any> {
    public createdAt: Date;
    public updatedAt: Date;

    constructor(public props: T, public id?: UniqueEntityId) {
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }

    update(): void {
        this.updatedAt = new Date();
    }

    equals(entity: this): boolean {
        entity;
        return true;
    }
}

export type EntityTimestamp = {
    createdAt?: Date;
    updatedAt?: Date;
};
