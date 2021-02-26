import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel } from '@/domain/usecases/parking'
import { GenericAddController } from '@/presentation/controllers/generic'

export class AddParkingController extends GenericAddController<
  ParkingModel,
  AddParkingModel
> {}
