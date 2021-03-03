import {
  InvalidBooleanError,
  InvalidNumberError,
  MissingParamError,
  InvalidStringError,
  InvalidMaxLengthError,
} from '@/presentation/errors'
import { BodyValidator } from '../protocols/body-validator'
import Ajv from 'ajv'
const Schema = require('../validators/schema.json')

export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: false,
  useDefaults: true,
})
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
ajv.addSchema(Schema, 'Schema')


export class BodyValidatorAdapter<T> implements BodyValidator<T> {
  private readonly validator
  constructor(private readonly typeName: string) {
    this.validator = ajv.getSchema(`Schema#/definitions/${this.typeName}`)
  }
  
  private detectError(error: string): Error {
    const errorString = error.split(',')[0]
    const stringErrorArray = errorString.split(' ')
    if (errorString.includes('should have required property')) {
      return new MissingParamError(stringErrorArray[stringErrorArray.length - 1].slice(1, stringErrorArray[stringErrorArray.length - 1].length -1))
    } else if (errorString.includes('should be number')) {
      const paramErrorArray = stringErrorArray[0].split('.')
      return new InvalidNumberError(paramErrorArray[paramErrorArray.length - 1])
    } else if (errorString.includes('should be string')) {
      const paramErrorArray = stringErrorArray[0].split('.')
      return new InvalidStringError(paramErrorArray[paramErrorArray.length - 1])
    } else if (errorString.includes('should be boolean')) {
      const paramErrorArray = stringErrorArray[0].split('.')
      return new InvalidBooleanError(paramErrorArray[paramErrorArray.length - 1])
    } 
    else if (errorString.includes('should NOT be longer than')) {
      const paramErrorArray = stringErrorArray[0].split('.')
      return new InvalidMaxLengthError(
        paramErrorArray[paramErrorArray.length - 1],
        Number(stringErrorArray[stringErrorArray.length - 2])
      )
    }
  }

  validate(value: unknown): T | Error {
    if (!this.validator) {
      throw new Error(`No validator defined for Schema#/definitions/${this.typeName}`)
    }

    const valid = this.validator(value)

    if (!valid) {
      const error = ajv.errorsText(
        this.validator.errors!.filter((e: any) => e.keyword !== 'if'),
        { dataVar: this.typeName }
      )
      return this.detectError(error)
    }

    return value as T
  }
}
