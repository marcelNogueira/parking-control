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

  async transformData(data: BaseT): Promise<any> {
    return Promise.resolve(data)
  }

  getModel(httpRequest?: HttpRequest) {
    return httpRequest.body
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = Number(httpRequest.params.id)
      const model = this.getModel(httpRequest)
      const error = this.validation?.validate(model)
      if (error) {
        return badRequest(error)
      }
      const updatedModel = await this.updateInterface.update(id, model)
      const values = await this.transformData(updatedModel);
      return success(values)
    } catch (err) {
      return serverError(err)
    }
  }
}
