export class EntityNotFoundError extends Error {
    constructor(id: string) {
        super(`Entity with ID ${id} was not found`);
        this.name = "EntityNotFoundError";
    }
}
