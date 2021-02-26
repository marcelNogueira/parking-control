import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { AddParking, AddParkingModel } from '@/domain/usecases/parking'
import {
  GenericAddControllerSutModel,
  GenericAddControllerTestSuite,
  GenericAddInterfaceStub,
} from '@/presentation/controllers/generic'
import { ValidationStub } from '@/presentation/controllers/generic'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, success } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { AddParkingController } from './add-parking-controller'

const throwError = (): never => {
  throw new Error()
}
const mockFactory = new MockParkingFactory()
const fakeResponse = mockFactory.makeMockAddResponseModel();
const makeFakeRequest = (): HttpRequest => ({
  body: mockFactory.makeMockAddModel(),
});

class AddParkingInterfaceStub implements AddParking {
  constructor(private readonly mockFactory: MockParkingFactory) {}
  async add(): Promise<any> {
    return await new Promise((resolve) => {
      const parking = this.mockFactory.makeMockModel();
      resolve(parking);
    });
  }
}

const addStub = new AddParkingInterfaceStub(mockFactory)
const validationStub = new ValidationStub()
const controller = new AddParkingController(addStub, validationStub)

interface AddParkingControllerSutTypes {
  controller: AddParkingController;
  addStub: AddParkingInterfaceStub;
  validationStub: ValidationStub;
  mockFactory: MockParkingFactory;
}

const makeAddParkingControllerSutModel = (): AddParkingControllerSutTypes => {
  class AddParkingControllerSutModel
    implements
      GenericAddControllerSutModel<ParkingModel, AddParkingModel> {
    validationStub = validationStub
    addStub = addStub
    controller = controller
    mockFactory = mockFactory
  }
  return new AddParkingControllerSutModel()
}

describe('Add Parking Controller', () => {
  test('Should call Add Parking with correct values', async () => {
    const { controller, addStub } = makeAddParkingControllerSutModel()
    const addSpy = jest.spyOn(addStub, 'add')
    await controller.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(mockFactory.makeMockAddModel())
  })
  
  test('Should throw 500 if Add Parking throws', async () => {
    const { controller, addStub } = makeAddParkingControllerSutModel()
    jest.spyOn(addStub, 'add').mockImplementationOnce(throwError)
    const response = await controller.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })
  
  test('Should return 400 if validation returns', async () => {
    const { controller, validationStub } = makeAddParkingControllerSutModel()
    if (validationStub) {
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
      const response = await controller.handle(makeFakeRequest())
      expect(response).toEqual(badRequest(new MissingParamError('any_param')))
    }
  })
  
  test('Should return success if object is valid', async () => {
    const { controller } = makeAddParkingControllerSutModel()
    const adddPartner = await controller.handle(makeFakeRequest())
    expect(adddPartner).toEqual(success(fakeResponse))
  })
})
