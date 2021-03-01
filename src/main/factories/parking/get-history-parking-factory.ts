import { DbGetHistoryParkings } from '@/data/usecases/parking'
import { ParkingPostgresRepository } from '@/infra/db/postgres/repositories/parking'
import { GetHistoryParkingController } from '@/presentation/controllers/parking'

export const makeGetHistoryParkingController = (): GetHistoryParkingController => {
  const parkingPostgresRepository = new ParkingPostgresRepository()
  const dbGetAllParking = new DbGetHistoryParkings(
    parkingPostgresRepository
  )
  return new GetHistoryParkingController(dbGetAllParking)
}
