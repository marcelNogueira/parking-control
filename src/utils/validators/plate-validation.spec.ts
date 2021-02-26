import { InvalidPlateError } from '@/presentation/errors'
import { PlateValidator } from '../protocols/plate-validator'
import { PlateValidation } from './plate-validation'

const makePlateValidation = (): PlateValidator => {
  class PlateValidatorStub implements PlateValidator {
    isValid (plate: string): boolean {
      return true
    }
  }
  return new PlateValidatorStub()
}

interface SutTypes {
  sut: PlateValidation
  plateValidatorStub: PlateValidator
}

const makeSut = (): SutTypes => {
  const plateValidatorStub = makePlateValidation()
  const sut = new PlateValidation(plateValidatorStub)
  return {
    sut,
    plateValidatorStub
  }
}

describe('Plate Validation', () => {
  test('Should return an error if PlateValidator returns false', () => {
    const { sut, plateValidatorStub } = makeSut()
    jest.spyOn(plateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ plate: 'string' })
    expect(error).toEqual(new InvalidPlateError())
  })

  test('Should call PlateValidator with correct value', () => {
    const { sut, plateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(plateValidatorStub, 'isValid')
    sut.validate({ plate: 'AAA-9999' })
    expect(isValidSpy).toHaveBeenCalledWith('AAA-9999')
  })

  test('Should throw if PlateValidator throws', () => {
    const { sut, plateValidatorStub } = makeSut()
    jest.spyOn(plateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
