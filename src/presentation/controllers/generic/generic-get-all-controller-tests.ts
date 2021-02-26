import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericGetAllInterface } from '@/domain/usecases/generic'
import {
  serverError,
  success,
} from '@/presentation/helpers/http/http-helper'
import { GenericGetAllController } from './generic-get-all-controller'
const throwError = (): never => {
  throw new Error()
}

export class GenericGetAllInterfaceStub<BaseT> implements GenericGetAllInterface<BaseT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, any, any>) {}
  async getAll(filters: any): Promise<BaseT[]> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModelArray()))
  }
}
export interface GenericGetAllControllerSutModel<BaseT> {
  controller: GenericGetAllController<BaseT>
  getStub: GenericGetAllInterface<BaseT>
  mockFactory: MockFactoryInterface<BaseT, any, any>
}

export class GenericGetAllControllerTestSuite<BaseT> {
  genericGetAllTestSuite = (sut: GenericGetAllControllerSutModel<BaseT>) => {
    return () => {
      beforeAll(async () => {})
      afterAll(async () => {})
      test('Should call getAll() with correct values', async () => {
        const getSpy = jest.spyOn(sut.getStub, 'getAll')
        await sut.controller.handle({
          params: {
            numberParam: 1,
            stringParam: '1',
          },
          query: {
            // Paginator
            limit: 10,
            after_id: 20,
            sort_by: `["asc(email)", "asc(id)", "desc(test)"]`,
            // Other
            stringQueryParam: 'string-param',
            numberQueryParam: 2,
            arrayQueryParam: [1, 2, 3],
            // number
          },
        })
        expect(getSpy).toHaveBeenCalledWith(
          {
            numberParam: 1,
            stringParam: '1',
            stringQueryParam: 'string-param',
            numberQueryParam: 2,
            arrayQueryParam: [1, 2, 3],
          },
          {
            limit: 10,
            lastId: 20,
            sortBy: [
              { key: 'email', asc: true },
              { key: 'id', asc: true },
              { key: 'test', asc: false },
            ],
          }
        )
      })

      test('Should return 200 and object with correct values on success', async () => {
        const httpResponse = await sut.controller.handle({
          params: {
            testParam: '1',
          },
        })
        expect(httpResponse).toEqual(success(sut.mockFactory.makeMockModelArray()))
      })

      test('Should return 500 if get throws', async () => {
        jest.spyOn(sut.getStub, 'getAll').mockImplementationOnce(throwError)
        const httpResponse = await sut.controller.handle({
          params: {
            testParam: '1',
          },
        })
        expect(httpResponse).toEqual(serverError(new Error()))
      })
    }
  }
}
