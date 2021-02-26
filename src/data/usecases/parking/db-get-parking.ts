import { ParkingModel } from '@/domain/models/parking'
import { GetParking } from '@/domain/usecases/parking'
import { GenericDbGet } from '@/data/usecases/generic'

export class DbGetParking extends GenericDbGet<ParkingModel> implements GetParking {}
