import { ParkingModel } from '@/domain/models/parking'
import { GetHistoryParkingByPlateModel } from '@/domain/usecases/parking/get-history-parking';
import { GenericGetAllController } from '@/presentation/controllers/generic'

export class GetHistoryParkingController extends GenericGetAllController<
  ParkingModel
> {
  async transformData(data: ParkingModel[]): Promise<GetHistoryParkingByPlateModel[]> {
    if (!data.length) return data;
    const response: GetHistoryParkingByPlateModel[] = data.map((parking: ParkingModel): GetHistoryParkingByPlateModel => {
      const { createdAt, plate, ...historyData } = parking;
      if (!historyData.time) {
        const leftDate = new Date();
        let seconds = (leftDate.valueOf() - createdAt.valueOf())/1000;
        const hours = Math.floor(seconds / (60*60));
        seconds -= hours * 60 * 60;
        const minutes = Math.floor(seconds / (60));
        seconds -= minutes * 60;
        const time = `${hours ? `${hours} hours ` : ''}${minutes ? `${minutes} minutes` : ''}${!minutes && !hours ? `${Math.floor(seconds)} seconds` : ''}`
        historyData.time = time;
      }
      return historyData;
    })
    return Promise.resolve(response);
  }
}
