import { 
  AddParkingRepository,
  GetAllParkingRepository,
  GetParkingRepository,
  UpdateParkingRepository
} from '@/data/protocols/db/parking'
import { ParkingModel } from '@/domain/models/parking'
import {
  AddParkingModel,
  OutParkingModel,
  PayParkingModel,
} from '@/domain/usecases/parking'
import { GenericRepository } from '@/infra/db/postgres/repositories/prisma-generic-repository'

export class ParkingPostgresRepository
  extends GenericRepository<
    ParkingModel,
    AddParkingModel,
    OutParkingModel | PayParkingModel
  >
  implements
    AddParkingRepository,
    GetAllParkingRepository,
    GetParkingRepository,
    UpdateParkingRepository {
  tableName = 'parking'
}
