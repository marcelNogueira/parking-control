import { InvalidPlateError } from '@/presentation/errors/'
import { PlateValidator } from '../protocols/plate-validator'
import { Validation } from '@/presentation/protocols/validation'

export class PlateValidation implements Validation {
  constructor (
    private readonly plateValidator: PlateValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.plateValidator.isValid(input.plate)
    if (!isValid) {
      return new InvalidPlateError()
    }
  }
}
