import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel, AddParkingResponseModel, OutParkingModel } from '@/domain/usecases/parking'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { UpdateParkingModel } from '@/domain/usecases/parking/update-parking'
import { PayParkingModel } from '@/domain/usecases/parking/pay-parking'
import { GetHistoryParkingByPlateModel } from '@/domain/usecases/parking/get-history-parking'
const mockDate = new Date()

export class MockParkingFactory
  implements MockFactoryInterface<ParkingModel, AddParkingModel, any> {
  makeMockModel(): ParkingModel {
    return { id: 1, plate: 'AAA-9990', createdAt: mockDate, time: 'string', paid: true, left: true }
  }

  makeMockAddResponseModel(): AddParkingResponseModel {
    return { parkingNumber: 1 }
  }

  makeMockAddModel(): AddParkingModel {
    return { plate: 'AAA-9999' }
  }

  makeMockUpdateModel(): UpdateParkingModel {
    return { left: true, paid: true }
  }

  makeMockPayModel(): PayParkingModel {
    return { paid: true }
  }

  makeMockOutModel(): OutParkingModel {
    return { left: true, time: '20 minutes' }
  }

  makeMockModelArray(): GetHistoryParkingByPlateModel[] {
    return [
      { id: 1, time: 'string', paid: false, left: false },
      { id: 2, time: '20 minutes', paid: true, left: true },
    ]
  }

  makeMockHistoryModelArray({time = undefined, createdAt = undefined}): GetHistoryParkingByPlateModel[] {
    return [
      { id: 1, time, paid: false, left: false, createdAt },
      { id: 2, time: '20 minutes', paid: true, left: true },
    ]
  }

  makeMockAddModelArray(): AddParkingModel[] {
    return [
      { plate: 'AAA-9990' },
      { plate: 'AAA-9990' },
    ]
  }
}
