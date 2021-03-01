import { ParkingModel } from '@/domain/models/parking'
import { GenericDbGetAll } from '@/data/usecases/generic'
import { GetAllParkingRepository } from '@/data/protocols/db/parking'

export class DbGetHistoryParkings extends GenericDbGetAll<ParkingModel> implements GetAllParkingRepository {}
