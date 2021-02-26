import { PlateValidator } from '../protocols/plate-validator'

export class PlateValidatorAdapter implements PlateValidator {
  isValid (input: string): boolean {
    const regexPlate = /^[a-zA-Z]{3}\-[0-9]{4}$/;
    return regexPlate.test(input)
  }
}
