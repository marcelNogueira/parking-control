import { BodyValidator } from '../protocols/body-validator'
import { Validation } from '@/presentation/protocols/validation'

export class BodyValidation<T> implements Validation {
  constructor(private readonly bodyValidator: BodyValidator<T>) {}

  validate(data: unknown): Error {
    const isValid = this.bodyValidator.validate(data)
    if (isValid instanceof Error) {
      return isValid
    }
  }
}
