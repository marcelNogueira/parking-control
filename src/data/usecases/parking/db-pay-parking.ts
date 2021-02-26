import { ParkingModel } from '@/domain/models/parking'
import { PayParking, PayParkingModel } from '@/domain/usecases/parking'
import { GenericDbUpdate } from '@/data/usecases/generic'

export class DbPayParking
  extends GenericDbUpdate<ParkingModel, PayParkingModel>
  implements PayParking {}
