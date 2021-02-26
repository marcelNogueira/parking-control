import { MockParkingFactory } from '@/domain/factories/parking'
import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel } from '@/domain/usecases/parking'
import {
  GenericAddControllerSutModel,
  GenericAddControllerTestSuite,
  GenericAddInterfaceStub,
} from '@/presentation/controllers/generic'
import { ValidationStub } from '@/presentation/controllers/generic'
import { AddParkingController } from './add-parking-controller'

const tests = new GenericAddControllerTestSuite<
  ParkingModel,
  AddParkingModel
>()
const mockFactory = new MockParkingFactory()
const addStub = new GenericAddInterfaceStub(mockFactory)
const validationStub = new ValidationStub()
const controller = new AddParkingController(addStub, validationStub)

const makeAddParkingControllerSutModel = (): GenericAddControllerSutModel<
  ParkingModel,
  AddParkingModel
> => {
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

describe(
  'Add Parking Controller',
  tests.genericAddTestSuite(makeAddParkingControllerSutModel())
)
