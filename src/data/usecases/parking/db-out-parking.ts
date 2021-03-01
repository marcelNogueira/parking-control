import { ParkingModel } from '@/domain/models/parking'
import { OutParkingModel } from '@/domain/usecases/parking'
import { GenericDbUpdate } from '@/data/usecases/generic'
import { UpdateParkingRepository } from '@/data/protocols/db/parking'

export class DbOutParking
  extends GenericDbUpdate<ParkingModel, OutParkingModel>
  implements UpdateParkingRepository {}
