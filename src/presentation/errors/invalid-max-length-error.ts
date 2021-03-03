export class InvalidMaxLengthError extends Error {
  constructor (paramName: string, maxLength: number) {
    super(`Invalid param: ${paramName}. Max length: ${maxLength}`)
    this.name = 'InvalidMaxLengthError'
  }
}
