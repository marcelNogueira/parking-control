import { DbAddParking } from '@/data/usecases/parking'
import { ParkingPostgresRepository } from '@/infra/db/postgres/repositories/parking'
import { AddParkingController } from '@/presentation/controllers/parking'
import { BodyParkingValidations } from './parking-validation-factory'

export const makeAddParkingController = (): AddParkingController => {
  const validation = new BodyParkingValidations()
  const parkingPostgresRepository = new ParkingPostgresRepository()
  const dbAddParking = new DbAddParking(parkingPostgresRepository)
  return new AddParkingController(dbAddParking, validation.makeBodyValidations())
}