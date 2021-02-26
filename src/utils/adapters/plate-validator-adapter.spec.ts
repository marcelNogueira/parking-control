import { InvalidPlateError } from '@/presentation/errors'
import { PlateValidatorAdapter } from './plate-validator-adapter'

const makeSut = (): PlateValidatorAdapter => {
  return new PlateValidatorAdapter();
}

describe('Plate Validation', () => {
  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('AAA-9999')
    expect(isEmailSpy).toHaveBeenCalledWith('AAA-9999')
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    const isValid = sut.isValid('AAA9999')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('AAA-9999')
    expect(isValid).toBe(true)
  })

  test('Should throw if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.isValid).toThrow()
  })
})
