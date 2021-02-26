import { MockParkingFactory } from '@/domain/factories/parking'
import { GetParking } from '@/domain/usecases/parking'
import { ValidationStub } from '@/presentation/controllers/generic'
import { InvalidOutError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { OutVerifierMiddleware } from './out-verifier-middleware'

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

class GetInterfaceStub implements GetParking {
  constructor(private readonly mockFactory: MockParkingFactory) {}
  async get(): Promise<any> {
    return await new Promise((resolve) => {
      const parking = this.mockFactory.makeMockModel();
      resolve(parking);
    });
  }
}

const getStub = new GetInterfaceStub(mockFactory)
const middleware = new OutVerifierMiddleware(getStub)

interface OutVerifierMiddlewareSutTypes {
  middleware: OutVerifierMiddleware;
  getStub: GetInterfaceStub;
  mockFactory: MockParkingFactory;
}

const makeOutVerifierMiddlewareSutModel = (): OutVerifierMiddlewareSutTypes => {
  class OutVerifierMiddlewareSutModel {
    getStub = getStub
    middleware = middleware
    mockFactory = mockFactory
  }
  return new OutVerifierMiddlewareSutModel()
}

describe('OutVerifier Controller', () => {
  test('Should call OutVerifier with correct values', async () => {
    const { middleware, getStub } = makeOutVerifierMiddlewareSutModel()
    const outSpy = jest.spyOn(getStub, 'get')
    await middleware.handle(makeFakeRequest())
    expect(outSpy).toHaveBeenCalledWith(fakeResponse.id, undefined)
  })
  
  test('Should throw 500 if OutVerifier throws', async () => {
    const { middleware, getStub } = makeOutVerifierMiddlewareSutModel()
    jest.spyOn(getStub, 'get').mockImplementationOnce(throwError)
    const response = await middleware.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })
  
  test('Should return 403 forbidden if get returns paid false', async () => {
    const { middleware, getStub } = makeOutVerifierMiddlewareSutModel()
    jest.spyOn(getStub, 'get').mockReturnValueOnce(Promise.resolve({ paid: false }))
    const response = await middleware.handle(makeFakeRequest())
    expect(response).toEqual(forbidden(new InvalidOutError()))
  })
  
  test('Should return success if object is valid', async () => {
    const { middleware } = makeOutVerifierMiddlewareSutModel()
    const paidPartner = await middleware.handle(makeFakeRequest())
    expect(paidPartner).toEqual(success({ createdAt: fakeResponse.createdAt }))
  })
})
