export class InvalidPlateError extends Error {
  constructor() {
    super(`The informed platte does not match format 'AAA-9999'`)
    this.name = 'InvalidPlateError'
  }
}
