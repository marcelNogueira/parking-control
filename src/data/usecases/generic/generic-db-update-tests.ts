import { GenericUpdateRepository } from '@/data/protocols/db/generic/generic-update-repository'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericDbUpdate } from './generic-db-update'

export interface GenericDbUpdateSutModel<BaseT, UpdateT> {
  sut: GenericDbUpdate<BaseT, UpdateT>
  mockFactory: MockFactoryInterface<BaseT, any, UpdateT>
  repositoryStub: GenericUpdateRepository<BaseT, UpdateT>
}

export class UpdateRepositoryStub<BaseT, UpdateT> implements GenericUpdateRepository<BaseT, UpdateT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, any, UpdateT>) {}
  async update(_: number): Promise<BaseT> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModel()))
  }
}

export class GenericDbUpdateTestSuite<BaseT, UpdateT> {
  genericDbUpdateTestSuite = (sutModel: GenericDbUpdateSutModel<BaseT, UpdateT>) => {
    return () => {
      beforeAll(async () => {})
      afterAll(async () => {})
      test('Should call repository with correct values', async () => {
        const updateSpy = jest.spyOn(sutModel.repositoryStub, 'update')
        await sutModel.sut.update(1, sutModel.mockFactory.makeMockUpdateModel())
        expect(updateSpy).toHaveBeenCalledWith(1, sutModel.mockFactory.makeMockUpdateModel())
      })
    }
  }
}
