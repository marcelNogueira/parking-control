import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import {
  GenericRepositorySutModel,
  GenericRepositoryTests,
} from '@/infra/db/postgres/repositories/prisma-generic-repository'
import { ParkingPostgresRepository } from './parking-repository'

const tests = new GenericRepositoryTests<ParkingModel, any, any>()

class Sut implements GenericRepositorySutModel<ParkingModel, any, any> {
  mockFactory = new MockParkingFactory()
  repository: ParkingPostgresRepository = new ParkingPostgresRepository()
}

const makeSut = (): Sut => {
  return new Sut()
}

describe('Parking Postgres Repository', () => {
  describe('get()', tests.genericGetTestSuite(makeSut()))
  describe('getAll()', tests.genericGetAllTestSuite(makeSut()))
  describe('update()', tests.genericUpdateTestSuite(makeSut()))
  describe('add()', tests.genericAddTestSuite(makeSut()))
  describe('delete()', tests.genericDeleteTestSuite(makeSut()))
})
