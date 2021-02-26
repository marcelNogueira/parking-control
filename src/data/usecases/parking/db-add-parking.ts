import { ParkingModel } from '@/domain/models/parking'
import { AddParking, AddParkingModel } from '@/domain/usecases/parking'
import { GenericDbAdd } from '@/data/usecases/generic'

export class DbAddParking extends GenericDbAdd<ParkingModel, AddParkingModel> implements AddParking {}
