import { Entity } from "../entity";
import { CreateRepository } from "./create.repository";
import { GetRepository } from "./get.repository";
import { UpdateRepository } from "./update.repository";

export interface DefaultRepository<E extends Entity<any>>
    extends CreateRepository<E>,
        UpdateRepository<E>,
        GetRepository<E> {}
