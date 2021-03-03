import { GetParking } from '@/domain/usecases/parking/get-parking'
import {
  forbidden,
  serverError,
  success,
  badRequest,
} from '@/presentation/helpers/http/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Middleware
} from '@/presentation/protocols'
import { getQueryParams } from '../controllers/generic/query-params'
import { InvalidOutError, NotFoundError } from '../errors'

export class OutVerifierMiddleware implements Middleware {
  constructor(protected readonly getInterface: GetParking) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = Number(httpRequest.params.id)
      const params = getQueryParams(httpRequest)
      const getModel = await this.getInterface.get(id, params)
      return getModel 
        ? getModel.paid
          ? success({ createdAt: getModel.createdAt })
          : forbidden(new InvalidOutError())
        : badRequest(new NotFoundError('ticket'))
    } catch (err) {
      return serverError(err)
    }
  }
}
