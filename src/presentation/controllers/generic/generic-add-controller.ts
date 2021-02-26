import { GenericAddInterface } from '@/domain/usecases/generic'
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/http/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Validation,
  Controller
} from '@/presentation/protocols'

export class GenericAddController<BaseT, AddT> implements Controller {
  constructor(
    protected readonly addInterface: GenericAddInterface<BaseT, AddT>,
    protected readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const model = httpRequest.body
      const error = this.validation?.validate(model)
      if (error) {
        return badRequest(error)
      }
      return success(await this.addInterface.add(model))
    } catch (err) {
      console.error(err)
      return serverError(err)
    }
  }
}
