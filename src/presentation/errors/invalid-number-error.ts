export class InvalidNumberError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName} is not a number`)
    this.name = 'InvalidNumberError'
  }
}
