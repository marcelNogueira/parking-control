export class InvalidBooleanError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName} is not a boolean`)
    this.name = 'InvalidBooleanError'
  }
}
