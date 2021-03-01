import { 
  AddParkingRepository,
  GetAllParkingRepository,
  GetParkingRepository,
  UpdateParkingRepository
} from '@/data/protocols/db/parking'
import { ParkingModel } from '@/domain/models/parking'
import {
  AddParkingModel,
} from '@/domain/usecases/parking'
import { GenericRepository } from '@/infra/db/postgres/repositories/prisma-generic-repository'

export class ParkingPostgresRepository
  extends GenericRepository<
    ParkingModel,
    AddParkingModel,
    AddParkingModel
  >
  implements
    AddParkingRepository,
    GetAllParkingRepository,
    GetParkingRepository,
    UpdateParkingRepository {
  tableName = 'parking'
}
