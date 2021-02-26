import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericUpdateInterface } from '@/domain/usecases/generic'
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
import { GenericUpdateController } from './generic-update-controller'

const throwError = (): never => {
  throw new Error()
}
export interface GenericUpdateControllerSutModel<BaseT, UpdateT> {
  controller: GenericUpdateController<BaseT, UpdateT>
  updateStub: GenericUpdateInterface<BaseT, UpdateT>
  validationStub: Validation
  mockFactory: MockFactoryInterface<BaseT, any, UpdateT>
}
export class GenericUpdateInterfaceStub<BaseT, UpdateT> implements GenericUpdateInterface<BaseT, UpdateT> {
  constructor(private readonly mockFactory: MockFactoryInterface<BaseT, any, UpdateT>) {}
  async update(_: number): Promise<BaseT> {
    return await new Promise((resolve) => resolve(this.mockFactory.makeMockModel()))
  }
}

export class ValidationStub implements Validation {
  validate(input: any): Error {
    return null
  }
}
export class GenericUpdateControllerTestSuite<BaseT, UpdateT> {
  mockRequest = (model: UpdateT): HttpRequest => ({
    params: { id: 1 },
    body: model,
  })

  genericUpdateTestSuite = (sut: GenericUpdateControllerSutModel<BaseT, UpdateT>) => {
    return () => {
      test('Should call Update with correct values', async () => {
        const updateSpy = jest.spyOn(sut.updateStub, 'update')
        const updateModel = sut.mockFactory.makeMockUpdateModel()
        const request = this.mockRequest(updateModel)
        await sut.controller.handle(request)
        expect(updateSpy).toHaveBeenCalledWith(request.params.id, updateModel)
      })

      test('Should return success if object is valid', async () => {
        const updateModel = sut.mockFactory.makeMockUpdateModel()
        const request = this.mockRequest(updateModel)
        const updatedPartner = await sut.controller.handle(request)
        expect(updatedPartner).toEqual(success(sut.mockFactory.makeMockModel()))
      })

      test('Should throw 500 if Update throws', async () => {
        jest.spyOn(sut.updateStub, 'update').mockImplementationOnce(throwError)
        const updateModel = sut.mockFactory.makeMockUpdateModel()
        const request = this.mockRequest(updateModel)
        const response = await sut.controller.handle(request)
        expect(response).toEqual(serverError(new ServerError(null)))
      })

      test('Should return 400 if validation returns', async () => {
        if (sut.validationStub) {
          jest.spyOn(sut.validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))

          const updateModel = sut.mockFactory.makeMockUpdateModel()
          const request = this.mockRequest(updateModel)
          const response = await sut.controller.handle(request)
          expect(response).toEqual(badRequest(new MissingParamError('any_param')))
        }
      })
    }
  }
}
