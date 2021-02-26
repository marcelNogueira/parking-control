import { ParkingModel } from '@/domain/models/parking'
import { PayParkingModel } from '@/domain/usecases/parking'
import { GenericUpdateController } from '@/presentation/controllers/generic'

export class PayParkingController extends GenericUpdateController<
  ParkingModel,
  PayParkingModel
> {
  getModel() {
    return { paid: true };
  }
}
