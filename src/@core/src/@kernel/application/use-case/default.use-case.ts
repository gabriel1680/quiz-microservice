export interface DefaultUseCase<I, O> {
    execute(input: I): Promise<O>;
}
