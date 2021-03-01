import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel } from '@/domain/usecases/parking'
import { GenericDbAdd } from '@/data/usecases/generic'
import { AddParkingRepository } from '@/data/protocols/db/parking'

export class DbAddParking extends GenericDbAdd<ParkingModel, AddParkingModel> implements AddParkingRepository {}
