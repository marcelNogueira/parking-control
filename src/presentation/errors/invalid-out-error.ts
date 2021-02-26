export class InvalidOutError extends Error {
  constructor() {
    super(`You need to pay your parking ticket first!`)
    this.name = 'InvalidOutError'
  }
}
