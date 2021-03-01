import { ParkingModel } from '@/domain/models/parking'
import { PayParkingModel } from '@/domain/usecases/parking'
import { GenericDbUpdate } from '@/data/usecases/generic'
import { UpdateParkingRepository } from '@/data/protocols/db/parking'

export class DbPayParking
  extends GenericDbUpdate<ParkingModel, PayParkingModel>
  implements UpdateParkingRepository {}
