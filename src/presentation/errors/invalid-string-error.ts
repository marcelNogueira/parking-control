export class InvalidStringError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName} is not a string`)
    this.name = 'InvalidStringError'
  }
}
