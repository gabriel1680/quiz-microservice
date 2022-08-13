import { UniqueEntityId } from "../value-object/unique-entity-id.value-object";

export abstract class Entity<T extends EntityTimestamp = any> {
    public id: UniqueEntityId;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(public props: T, id?: UniqueEntityId) {
        this.id = id || UniqueEntityId.create();
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }

    update(): void {
        this.updatedAt = new Date();
    }

    equals(entity: this): boolean {
        if (!entity || typeof entity !== "object") return false;

        if (!entity.id || !(entity.id instanceof UniqueEntityId)) return false;

        if (!(entity instanceof Entity)) return false;

        if (entity.id.value !== this.id.value) return false;

        return true;
    }
}

export type EntityTimestamp = {
    createdAt?: Date;
    updatedAt?: Date;
};
