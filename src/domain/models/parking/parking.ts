export interface ParkingModel {
  /**
   * @hidden
   */
  id: number
  plate?: string
  time?: string
  paid?: boolean
  left?: boolean
  /**
   * @hidden
   */
  createdAt: Date
}