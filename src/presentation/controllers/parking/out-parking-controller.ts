import { ParkingModel } from '@/domain/models/parking'
import { OutParkingModel } from '@/domain/usecases/parking'
import { GenericUpdateController } from '@/presentation/controllers/generic'
import { HttpRequest } from '@/presentation/protocols';

export class OutParkingController extends GenericUpdateController<
  ParkingModel,
  OutParkingModel
> {
  getModel(httpRequest: HttpRequest) {
    const inDate = httpRequest.createdAt;
    const leftDate = new Date();
    let seconds = (leftDate.valueOf() - inDate.valueOf())/1000;
    const hours = Math.floor(seconds / (60*60));
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / (60));
    seconds -= minutes * 60;
    const time = `${hours ? `${hours} hours ` : ''}${minutes ? `${minutes} minutes` : ''}${!minutes && !hours ? `${Math.floor(seconds)} seconds` : ''}`
    return { left: true, time };
  }
}
