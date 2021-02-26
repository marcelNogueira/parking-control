import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericAddInterface } from '@/domain/usecases/generic'
import { MissingParamError, ServerError } from '@/presentation/errors'
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/http/http-helper'
import {
  HttpRequest,
  Validation,
} from '@/presentation/protocols'
import { GenericAddController } from './generic-add-controller'

const throwError = (): never => {
  throw new Error()
}
export interface GenericAddControllerSutModel<BaseT, AddT> {
  controller: GenericAddController<BaseT, AddT>
  addStub: GenericAddInterface<BaseT, AddT>
  validationStub: Validation
  mockFactory: MockFactoryInterface<BaseT, any, AddT>
}
export class GenericAddInterfaceStub<BaseT, AddT> implements GenericAddInterface<BaseT, AddT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, AddT, any>) {}
  async add(_: AddT): Promise<BaseT> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModel()))
  }
}
export class GenericAddControllerTestSuite<BaseT, AddT> {
  mockRequest = (model: AddT): HttpRequest => ({
    body: model,
  })

  genericAddTestSuite = (sut: GenericAddControllerSutModel<BaseT, AddT>) => {
    return () => {
      test('Should call Add with correct values', async () => {
        const addSpy = jest.spyOn(sut.addStub, 'add')
        const addModel = sut.mockFactory.makeMockAddModel()
        const request = this.mockRequest(addModel)
        await sut.controller.handle(request)
        expect(addSpy).toHaveBeenCalledWith(addModel)
      })
      
      test('Should throw 500 if Add throws', async () => {
        jest.spyOn(sut.addStub, 'add').mockImplementationOnce(throwError)
        const addModel = sut.mockFactory.makeMockAddModel()
        const request = this.mockRequest(addModel)
        const response = await sut.controller.handle(request)
        expect(response).toEqual(serverError(new ServerError(null)))
      })
      
      test('Should return 400 if validation returns', async () => {
        if (sut.validationStub) {
          jest.spyOn(sut.validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
          
          const addModel = sut.mockFactory.makeMockAddModel()
          const request = this.mockRequest(addModel)
          const response = await sut.controller.handle(request)
          expect(response).toEqual(badRequest(new MissingParamError('any_param')))
        }
      })

      test('Should return success if object is valid', async () => {
        const addModel = sut.mockFactory.makeMockAddModel()
        const request = this.mockRequest(addModel)
        const adddPartner = await sut.controller.handle(request)
        expect(adddPartner).toEqual(success(sut.mockFactory.makeMockModel()))
      })
    }
  }
}
