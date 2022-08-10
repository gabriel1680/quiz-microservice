import { Entity } from "../entity";

export interface UpdateRepository<I extends Entity<any>, O = void> {
    create(entity: I): Promise<O>;
}
