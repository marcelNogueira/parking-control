export interface ParkingModel {
  /**
   * @hidden
   */
  id: number
  /**
   * @maxLength 8
   */
  plate: string
  time?: string
  paid?: boolean
  left?: boolean
  /**
   * @hidden
   */
  createdAt: Date
}