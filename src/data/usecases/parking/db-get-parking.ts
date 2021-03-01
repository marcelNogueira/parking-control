import { ParkingModel } from '@/domain/models/parking'
import { GenericDbGet } from '@/data/usecases/generic'
import { GetParkingRepository } from '@/data/protocols/db/parking'

export class DbGetParking extends GenericDbGet<ParkingModel> implements GetParkingRepository {}
