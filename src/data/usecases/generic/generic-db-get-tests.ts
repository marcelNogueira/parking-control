import { GenericGetRepository } from '@/data/protocols/db/generic/generic-get-repository'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericDbGet } from './generic-db-get'

export interface GenericDbGetSutModel<BaseT> {
  sut: GenericDbGet<BaseT>
  mockFactory: MockFactoryInterface<BaseT, any, any>
  repositoryStub: GenericGetRepository<BaseT>
}

export class GetRepositoryStub<BaseT> implements GenericGetRepository<BaseT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, any, any>) {}
  async get(_: number): Promise<BaseT> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModel()))
  }
}

export class GenericDbGetTestSuite<BaseT> {
  genericDbGetTestSuite = (sutModel: GenericDbGetSutModel<BaseT>) => {
    return () => {
      beforeAll(async () => {})
      afterAll(async () => {})
      test('Should call repository with correct values', async () => {
        const getSpy = jest.spyOn(sutModel.repositoryStub, 'get')
        await sutModel.sut.get(1)
        expect(getSpy).toHaveBeenCalledWith(1, undefined)
      })
    }
  }
}
