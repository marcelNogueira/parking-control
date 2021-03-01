import { GenericDbGetAllSutModel, GenericDbGetAllTestSuite, GetAllRepositoryStub } from '@/data/usecases/generic'
import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { DbGetHistoryParkings } from './db-get-history-parking'

const tests = new GenericDbGetAllTestSuite<ParkingModel>()
const mockFactory = new MockParkingFactory()
const repositoryStub = new GetAllRepositoryStub<ParkingModel>(mockFactory)
const sut = new DbGetHistoryParkings(repositoryStub)
const makeDbGetAllParkingsSutModel = (): GenericDbGetAllSutModel<ParkingModel> => {
  class DbGetAllParkingsSutModel implements GenericDbGetAllSutModel<ParkingModel> {
    repositoryStub = repositoryStub
    sut = sut
    mockFactory = mockFactory
  }
  return new DbGetAllParkingsSutModel()
}

describe('Get All Parkings', tests.genericDbGetAllTestSuite(makeDbGetAllParkingsSutModel()))
