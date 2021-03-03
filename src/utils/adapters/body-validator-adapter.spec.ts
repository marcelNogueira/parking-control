import { InvalidBooleanError, InvalidMaxLengthError, InvalidNumberError, InvalidStringError, MissingParamError } from '@/presentation/errors';
import { BodyValidatorAdapter, ajv } from './body-validator-adapter'
const Schema = require('./schema-test.json')

type BodyTestModel = {
  string: string
  number?: number
  bool?: boolean
}

const fakeBodyTest: BodyTestModel = {
  string: 'string',
  number: 1,
  bool: true
}

const makeSut = (): BodyValidatorAdapter<BodyTestModel> => {
  return new BodyValidatorAdapter('BodyTestModel');
}

describe('Body Validation', () => {
  ajv.removeSchema('Schema')
  ajv.addSchema(Schema, 'Schema')
  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(sut, 'validate')
    sut.validate(fakeBodyTest)
    expect(isValidSpy).toHaveBeenCalledWith(fakeBodyTest)
  })
  
  test('Should return missing param error if required param is missing', () => {
    const sut = makeSut()
    const isValid = sut.validate({})
    expect(isValid).toEqual(new MissingParamError('string'))
  })
  
  test('Should return invalid number error if a number param is sent with different type', () => {
    const sut = makeSut()
    const isValid = sut.validate({ string: 'string', number: 'string' })
    expect(isValid).toEqual(new InvalidNumberError('number'))
  })
  
  test('Should return invalid string error if a string param is sent with different type', () => {
    const sut = makeSut()
    const isValid = sut.validate({ string: 1})
    expect(isValid).toEqual(new InvalidStringError('string'))
  })
  
  test('Should return invalid boolean error if a boolean param is sent with different type', () => {
    const sut = makeSut()
    const isValid = sut.validate({ string: 'string', bool: 'string' })
    expect(isValid).toEqual(new InvalidBooleanError('bool'))
  })
  
  test('Should return invalid max length error if the value of a string param exceeds the max length', () => {
    const sut = makeSut()
    const isValid = sut.validate({ string: 'AAAAAAAAAAAAAAA'})
    expect(isValid).toEqual(new InvalidMaxLengthError('string', 6))
  })

  test('Should return the object validated if validator returns true', () => {
    const sut = makeSut()
    const validObject = sut.validate(fakeBodyTest)
    expect(validObject).toEqual(fakeBodyTest)
  })

  test('Should throw if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
