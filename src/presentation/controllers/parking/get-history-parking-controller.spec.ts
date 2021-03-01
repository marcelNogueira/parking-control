import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { GetHistoryParkingByPlateModel } from '@/domain/usecases/parking/get-history-parking'
import {
  GenericGetAllControllerSutModel,
  GenericGetAllControllerTestSuite,
  GenericGetAllInterfaceStub,
} from '@/presentation/controllers/generic'
import { success } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { GetHistoryParkingController } from './get-history-parking-controller'

const mockFactory = new MockParkingFactory()
const fakeResponse = mockFactory.makeMockAddResponseModel();
const makeFakeRequest = (): HttpRequest => ({
  params: {
    plate: 'AAA-9999'
  },
});

const tests = new GenericGetAllControllerTestSuite<GetHistoryParkingByPlateModel>()
const getStub = new GenericGetAllInterfaceStub(mockFactory)
const controller = new GetHistoryParkingController(getStub)

const makeGetAllParkingsControllerSutModel = (): GenericGetAllControllerSutModel<
  GetHistoryParkingByPlateModel
> => {
  class GetAllParkingsControllerSutModel
    implements GenericGetAllControllerSutModel<GetHistoryParkingByPlateModel> {
    getStub = getStub
    controller = controller
    mockFactory = mockFactory
  }
  return new GetAllParkingsControllerSutModel()
}

describe(
  'Get All Parkings Controller',
  tests.genericGetAllTestSuite(makeGetAllParkingsControllerSutModel())
)

describe('Get parking history by plate', () => {
  test('should ensure that transform data updates time value for cars that does not left', async () => {
    const { controller, getStub } = makeGetAllParkingsControllerSutModel()
    const createdAt = new Date();
    createdAt.setMinutes(createdAt.getMinutes() - 20);
    jest.spyOn(getStub, 'getAll').mockReturnValueOnce(Promise.resolve(mockFactory.makeMockHistoryModelArray({createdAt})))
    const history = await controller.handle(makeFakeRequest())
    const historyExpected = mockFactory.makeMockHistoryModelArray({time: '20 minutes'})
    expect(history).toEqual(success(historyExpected))
  })
})
