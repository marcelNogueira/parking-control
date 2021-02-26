import { GenericGetAllRepository } from '@/data/protocols/db/generic/generic-get-all-repository'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericDbGetAll } from './generic-db-get-all'

export interface GenericDbGetAllSutModel<BaseT> {
  sut: GenericDbGetAll<BaseT>
  mockFactory: MockFactoryInterface<BaseT, any, any>
  repositoryStub: GenericGetAllRepository<BaseT>
}

export class GetAllRepositoryStub<BaseT> implements GenericGetAllRepository<BaseT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, any, any>) {}
  async getAll(_: any): Promise<BaseT[]> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModelArray()))
  }
}

export class GenericDbGetAllTestSuite<BaseT> {
  genericDbGetAllTestSuite = (sutModel: GenericDbGetAllSutModel<BaseT>) => {
    return () => {
      beforeAll(async () => {})
      afterAll(async () => {})
      test('Should call repository with correct values', async () => {
        const getSpy = jest.spyOn(sutModel.repositoryStub, 'getAll')
        await sutModel.sut.getAll(
          {
            testParam: 1,
          }
        )
        expect(getSpy).toHaveBeenCalledWith(
          {
            testParam: 1,
          }
        )
      })
    }
  }
}
