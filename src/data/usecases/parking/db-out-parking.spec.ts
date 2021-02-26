import { GenericDbUpdateSutModel, GenericDbUpdateTestSuite, UpdateRepositoryStub } from '@/data/usecases/generic'
import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { UpdateParkingModel } from '@/domain/usecases/parking'
import { DbOutParking } from './db-out-parking'

const tests = new GenericDbUpdateTestSuite<ParkingModel, UpdateParkingModel>()
const mockFactory = new MockParkingFactory()
const repositoryStub = new UpdateRepositoryStub(mockFactory)
const sut = new DbOutParking(repositoryStub)

const makeDbUpdateParkingSutModel = (): GenericDbUpdateSutModel<ParkingModel, UpdateParkingModel> => {
  class DbUpdateParkingSutModel implements GenericDbUpdateSutModel<ParkingModel, UpdateParkingModel> {
    repositoryStub = repositoryStub
    sut = sut
    mockFactory = mockFactory
  }
  return new DbUpdateParkingSutModel()
}

describe('Update Parking', tests.genericDbUpdateTestSuite(makeDbUpdateParkingSutModel()))
