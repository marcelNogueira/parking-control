import { GenericGetAllInterface } from '@/domain/usecases/generic'
import { QueryFilters } from '@/presentation/helpers/types'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import {
  forbidden,
  serverError,
  success,
} from '@/presentation/helpers/http/http-helper'
export class GenericGetAllController<BaseT> implements Controller {
  constructor(private readonly getAllInterface: GenericGetAllInterface<BaseT>) {}

  transformParams: string[] = []

  async transformData(data: BaseT[]): Promise<any[]> {
    return Promise.resolve(data)
  }

  getParams(httpRequest: HttpRequest): QueryFilters {
    return httpRequest.params
  }

  getQueryParams(httpRequest: HttpRequest): [QueryFilters] {
    const normalQueryParams: QueryFilters = {}

    if (httpRequest.query) {
      Object.entries(httpRequest.query).forEach(([key, value]) => {
        normalQueryParams[key] = value || true
      })
    }
    return [normalQueryParams]
  }

  /**
   * Método handle retorna uma HttpResponse com um array de objetos do tipo BaseT
   */
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<BaseT[]>> {
    try {
      const [normalQueryParams] = this.getQueryParams(httpRequest)
      const getAllModel = await this.getAllInterface.getAll(
        {
          ...httpRequest.params,
          ...normalQueryParams,
        },
      )
      const values = await this.transformData(getAllModel)
      return values.length
        ? success(values)
        : forbidden(new Error('You do not have permission to access this'))
    } catch (err) {
      console.error(err)
      return serverError(err)
    }
  }
}
