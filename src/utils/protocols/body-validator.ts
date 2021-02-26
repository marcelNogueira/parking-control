export interface BodyValidator<T> {
  validate(bodyInput: unknown): T | Error
}
