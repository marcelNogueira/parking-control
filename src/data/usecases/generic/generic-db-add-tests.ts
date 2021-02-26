import { GenericAddRepository } from '@/data/protocols/db/generic/generic-add-repository'
import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericDbAdd } from './generic-db-add'

export interface GenericDbAddSutModel<BaseT, AddT> {
  sut: GenericDbAdd<BaseT, AddT>
  mockFactory: MockFactoryInterface<BaseT, AddT, any>
  repositoryStub: GenericAddRepository<BaseT, AddT>
}

export class AddRepositoryStub<BaseT, AddT> implements GenericAddRepository<BaseT, AddT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, AddT, any>) {}
  async add(_: AddT): Promise<BaseT> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModel()))
  }
}

export class GenericDbAddTestSuite<BaseT, AddT> {
  genericDbAddTestSuite = (sutModel: GenericDbAddSutModel<BaseT, AddT>) => {
    return () => {
      beforeAll(async () => {})

      afterAll(async () => {})
      test('Should call repository with correct values', async () => {
        const addSpy = jest.spyOn(sutModel.repositoryStub, 'add')
        await sutModel.sut.add(sutModel.mockFactory.makeMockAddModel())
        expect(addSpy).toHaveBeenCalledWith(sutModel.mockFactory.makeMockAddModel())
      })
    }
  }
}
