import { MockParkingFactory } from '@/domain/factories/parking'
import { OutParking } from '@/domain/usecases/parking'
import { ValidationStub } from '@/presentation/controllers/generic'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, success } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { OutParkingController } from './out-parking-controller'

const throwError = (): never => {
  throw new Error()
}
const mockFactory = new MockParkingFactory()
const fakeResponse = mockFactory.makeMockModel();
const makeFakeRequest = (): HttpRequest => {
  const createdAt = new Date();
  createdAt.setMinutes(createdAt.getMinutes() - 20);
  return {
    params: {
      id: fakeResponse.id,
    },
    createdAt
  }
};

class OutParkingInterfaceStub implements OutParking {
  constructor(private readonly mockFactory: MockParkingFactory) {}
  async update(): Promise<any> {
    return await new Promise((resolve) => {
      const parking = this.mockFactory.makeMockModel();
      resolve(parking);
    });
  }
}

const outStub = new OutParkingInterfaceStub(mockFactory)
const validationStub = new ValidationStub()
const controller = new OutParkingController(outStub, validationStub)

interface OutParkingControllerSutTypes {
  controller: OutParkingController;
  outStub: OutParkingInterfaceStub;
  validationStub: ValidationStub;
  mockFactory: MockParkingFactory;
}

const makeOutParkingControllerSutModel = (): OutParkingControllerSutTypes => {
  class OutParkingControllerSutModel {
    validationStub = validationStub
    outStub = outStub
    controller = controller
    mockFactory = mockFactory
  }
  return new OutParkingControllerSutModel()
}

describe('Out Parking Controller', () => {
  test('Should call Out Parking with correct values', async () => {
    const { controller, outStub } = makeOutParkingControllerSutModel()
    const outSpy = jest.spyOn(outStub, 'update')
    await controller.handle(makeFakeRequest())
    expect(outSpy).toHaveBeenCalledWith(fakeResponse.id, mockFactory.makeMockOutModel())
  })
  
  test('Should throw 500 if Out Parking throws', async () => {
    const { controller, outStub } = makeOutParkingControllerSutModel()
    jest.spyOn(outStub, 'update').mockImplementationOnce(throwError)
    const response = await controller.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })
  
  test('Should return 400 if validation returns', async () => {
    const { controller, validationStub } = makeOutParkingControllerSutModel()
    if (validationStub) {
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
      const response = await controller.handle(makeFakeRequest())
      expect(response).toEqual(badRequest(new MissingParamError('any_param')))
    }
  })
  
  test('Should return success if object is valid', async () => {
    const { controller } = makeOutParkingControllerSutModel()
    const paidPartner = await controller.handle(makeFakeRequest())
    expect(paidPartner).toEqual(success(fakeResponse))
  })
})
