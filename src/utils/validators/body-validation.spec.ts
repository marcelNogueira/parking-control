import { BodyValidator } from '../protocols/body-validator'
import { BodyValidation } from './body-validation'
import { InvalidBooleanError } from '@/presentation/errors'

interface GenericModel {
  boolean?: boolean
  required: string
  string?: string
  number?: number
}

const makeBodyValidator = (): BodyValidator<GenericModel> => {
  class BodyValidatorStub implements BodyValidator<GenericModel> {
    validate(data: unknown): GenericModel | Error {
      return { required: 'required' }
    }
  }
  return new BodyValidatorStub()
}

interface SutTypes {
  sut: BodyValidation<GenericModel>
  bodyValidatorStub: BodyValidator<GenericModel>
}

const makeSut = (): SutTypes => {
  const bodyValidatorStub = makeBodyValidator()
  const sut = new BodyValidation(bodyValidatorStub)
  return {
    sut,
    bodyValidatorStub,
  }
}

describe('Body Validation', () => {
  test('Should return an error if BodyValidator returns an Error', () => {
    const { sut, bodyValidatorStub } = makeSut()
    jest.spyOn(bodyValidatorStub, 'validate').mockReturnValueOnce(new InvalidBooleanError('boolean'))
    const error = sut.validate({ boolean: false })
    expect(error).toEqual(new InvalidBooleanError('boolean'))
  })

  test('Should call BodyValidator with an object that have required property', () => {
    const { sut, bodyValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(bodyValidatorStub, 'validate')
    sut.validate({ required: 'required' })
    expect(validateSpy).toHaveBeenCalledWith({ required: 'required' })
  })

  test('Should throw if BodyValidator throws', () => {
    const { sut, bodyValidatorStub } = makeSut()
    jest.spyOn(bodyValidatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
