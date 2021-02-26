import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel, AddParkingResponseModel } from '@/domain/usecases/parking'
import { GenericAddController } from '@/presentation/controllers/generic'

export class AddParkingController extends GenericAddController<
  ParkingModel,
  AddParkingModel
> {
  async transformData(data: ParkingModel): Promise<AddParkingResponseModel> {
    const response: AddParkingResponseModel = { parkingNumber: data.id }
    return Promise.resolve(response)
  }
}
