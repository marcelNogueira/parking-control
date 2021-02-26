import { ParkingModel } from '@/domain/models/parking'
import { OutParkingModel } from '@/domain/usecases/parking'
import { GenericUpdateController } from '@/presentation/controllers/generic'

export class OutParkingController extends GenericUpdateController<
  ParkingModel,
  OutParkingModel
> {
  getModel() {
    return { left: true };
  }
}
