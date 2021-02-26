import { ParkingModel } from '@/domain/models/parking'
import { OutParking, OutParkingModel } from '@/domain/usecases/parking'
import { GenericDbUpdate } from '@/data/usecases/generic'

export class DbOutParking
  extends GenericDbUpdate<ParkingModel, OutParkingModel>
  implements OutParking {}
