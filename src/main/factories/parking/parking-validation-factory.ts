import { ParkingModel } from '@/domain/models/parking'
import { Validation } from '@/presentation/protocols/validation'
import { PlateValidatorAdapter } from '@/utils/adapters/plate-validator-adapter';
import { PlateValidation } from '@/utils/validators';
import { GenericBodyValidationFactory } from '../generic/generic-validation-factory'

export class BodyParkingValidations extends GenericBodyValidationFactory<ParkingModel> {
  constructor() {
    super('ParkingModel');
    this.validations.push(new PlateValidation(new PlateValidatorAdapter()))
  }
}
