import { DbPayParking } from '@/data/usecases/parking'
import { ParkingPostgresRepository } from '@/infra/db/postgres/repositories/parking'
import { PayParkingController } from '@/presentation/controllers/parking'

export const makePayParkingController = (): PayParkingController => {
  const parkingPostgresRepository = new ParkingPostgresRepository()
  const dbPayParking = new DbPayParking(parkingPostgresRepository)
  return new PayParkingController(dbPayParking)
}