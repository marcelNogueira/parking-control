import { MockParkingFactory } from '@/domain/factories/parking'
import { PayParking } from '@/domain/usecases/parking'
import { ValidationStub } from '@/presentation/controllers/generic'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, success } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { PayParkingController } from './pay-parking-controller'

const throwError = (): never => {
  throw new Error()
}
const mockFactory = new MockParkingFactory()
const fakeResponse = mockFactory.makeMockModel();
const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: fakeResponse.id,
  }
});

class PayParkingInterfaceStub implements PayParking {
  constructor(private readonly mockFactory: MockParkingFactory) {}
  async update(): Promise<any> {
    return await new Promise((resolve) => {
      const parking = this.mockFactory.makeMockModel();
      resolve(parking);
    });
  }
}

const payStub = new PayParkingInterfaceStub(mockFactory)
const validationStub = new ValidationStub()
const controller = new PayParkingController(payStub, validationStub)

interface PayParkingControllerSutTypes {
  controller: PayParkingController;
  payStub: PayParkingInterfaceStub;
  validationStub: ValidationStub;
  mockFactory: MockParkingFactory;
}

const makePayParkingControllerSutModel = (): PayParkingControllerSutTypes => {
  class PayParkingControllerSutModel {
    validationStub = validationStub
    payStub = payStub
    controller = controller
    mockFactory = mockFactory
  }
  return new PayParkingControllerSutModel()
}

describe('Pay Parking Controller', () => {
  test('Should call Pay Parking with correct values', async () => {
    const { controller, payStub } = makePayParkingControllerSutModel()
    const paySpy = jest.spyOn(payStub, 'update')
    await controller.handle(makeFakeRequest())
    expect(paySpy).toHaveBeenCalledWith(fakeResponse.id, mockFactory.makeMockPayModel())
  })
  
  test('Should throw 500 if Pay Parking throws', async () => {
    const { controller, payStub } = makePayParkingControllerSutModel()
    jest.spyOn(payStub, 'update').mockImplementationOnce(throwError)
    const response = await controller.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })
  
  test('Should return 400 if validation returns', async () => {
    const { controller, validationStub } = makePayParkingControllerSutModel()
    if (validationStub) {
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
      const response = await controller.handle(makeFakeRequest())
      expect(response).toEqual(badRequest(new MissingParamError('any_param')))
    }
  })
  
  test('Should return success if object is valid', async () => {
    const { controller } = makePayParkingControllerSutModel()
    const paidPartner = await controller.handle(makeFakeRequest())
    expect(paidPartner).toEqual(success(fakeResponse))
  })
})
