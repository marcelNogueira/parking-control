import { GenericUpdateInterface } from '@/domain/usecases/generic'
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

export class GenericUpdateController<BaseT, UpdateT> implements Controller {
  constructor(
    private readonly updateInterface: GenericUpdateInterface<BaseT, UpdateT>,
    private readonly validation?: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const model = httpRequest.body
      const error = this.validation?.validate(model)
      if (error) {
        return badRequest(error)
      } else {
        const updatedModel = await this.updateInterface.update(id, model)
        return success(updatedModel)
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
