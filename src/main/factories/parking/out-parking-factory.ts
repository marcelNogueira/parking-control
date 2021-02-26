import { DbOutParking } from '@/data/usecases/parking'
import { ParkingPostgresRepository } from '@/infra/db/postgres/repositories/parking'
import { OutParkingController } from '@/presentation/controllers/parking'

export const makeOutParkingController = (): OutParkingController => {
  const parkingPostgresRepository = new ParkingPostgresRepository()
  const dbOutParking = new DbOutParking(parkingPostgresRepository)
  return new OutParkingController(dbOutParking)
}