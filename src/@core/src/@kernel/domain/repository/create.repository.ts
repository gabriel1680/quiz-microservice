import { Entity } from "../entity";

export interface CreateRepository<I extends Entity<any>, O = void> {
    create(entity: I): Promise<O>;
}
