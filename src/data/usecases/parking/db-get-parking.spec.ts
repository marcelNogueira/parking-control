import { GenericDbGetSutModel, GenericDbGetTestSuite, GetRepositoryStub } from '@/data/usecases/generic'
import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { DbGetParking } from './db-get-parking'

const tests = new GenericDbGetTestSuite<ParkingModel>()
const mockFactory = new MockParkingFactory()
const repositoryStub = new GetRepositoryStub(mockFactory)
const sut = new DbGetParking(repositoryStub)

const makeDbGetParkingSutModel = (): GenericDbGetSutModel<ParkingModel> => {
  class DbGetParkingSutModel implements GenericDbGetSutModel<ParkingModel> {
    repositoryStub = repositoryStub
    sut = sut
    mockFactory = mockFactory
  }
  return new DbGetParkingSutModel()
}

describe('Get Parking', tests.genericDbGetTestSuite(makeDbGetParkingSutModel()))
