import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel, AddParkingResponseModel } from '@/domain/usecases/parking'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
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

  makeMockUpdateModel(): AddParkingModel {
    return { left: true, paid: true }
  }

  makeMockModelArray(): ParkingModel[] {
    return [
      { id: 1, plate: 'AAA-9990', createdAt: mockDate, time: 'string', paid: true, left: true },
      { id: 2, plate: 'AAA-9990', createdAt: mockDate, time: 'string', paid: true, left: true },
    ]
  }

  makeMockAddModelArray(): AddParkingModel[] {
    return [
      { plate: 'AAA-9990' },
      { plate: 'AAA-9990' },
    ]
  }
}
