import { AddRepositoryStub, GenericDbAddSutModel, GenericDbAddTestSuite } from '@/data/usecases/generic'
import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel } from '@/domain/usecases/parking'
import { DbAddParking } from './db-add-parking'

const tests = new GenericDbAddTestSuite<ParkingModel, AddParkingModel>()
const mockFactory = new MockParkingFactory()
const repositoryStub = new AddRepositoryStub(mockFactory)
const sut = new DbAddParking(repositoryStub)

const makeDbAddParkingSutModel = (): GenericDbAddSutModel<ParkingModel, AddParkingModel> => {
  class DbAddParkingSutModel implements GenericDbAddSutModel<ParkingModel, AddParkingModel> {
    repositoryStub = repositoryStub
    sut = sut
    mockFactory = mockFactory
  }
  return new DbAddParkingSutModel()
}

describe('Add Parking', tests.genericDbAddTestSuite(makeDbAddParkingSutModel()))
