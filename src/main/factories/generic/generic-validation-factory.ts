import { Validation } from '@/presentation/protocols/validation'
import { BodyValidatorAdapter } from '@/utils/adapters/body-validator-adapter'
import { BodyValidation } from '@/utils/validators/body-validation'
import { ValidationComposite } from '@/utils/validators/validations-composite'

export class GenericBodyValidationFactory<T> {
  protected validations: Validation[] = []
  constructor(private readonly typeName: string) {
    this.validations.push(new BodyValidation<T>(new BodyValidatorAdapter(this.typeName)))
  }

  makeBodyValidations(): ValidationComposite {
    return new ValidationComposite(this.validations)
  }
}
