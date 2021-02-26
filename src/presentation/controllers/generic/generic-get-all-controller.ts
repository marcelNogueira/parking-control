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

  //* Caso método não seja sobrescrito, não faz nada */
  async transformData(data: BaseT[], transformTypes?: string[]): Promise<any[]> {
    return Promise.resolve(data)
  }

  getParams(httpRequest: HttpRequest): QueryFilters {
    return httpRequest.params
  }

  getQueryParams(httpRequest: HttpRequest): [QueryFilters, QueryFilters] {
    const transformParams: QueryFilters = {}
    const normalQueryParams: QueryFilters = {}

    if (httpRequest.query) {
      Object.entries(httpRequest.query).forEach(([key, value]) => {
        // ?after_id=20&limit=10
        if (this.transformParams && this.transformParams.includes(key)) {
          transformParams[key] = value || true
        } else {
          normalQueryParams[key] = value || true
        }
      })
    }
    return [normalQueryParams, transformParams]
  }

  /**
   * Método handle retorna uma HttpResponse com um array de objetos do tipo BaseT
   */
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<BaseT[]>> {
    try {
      const [normalQueryParams, transformParams] = this.getQueryParams(httpRequest)
      const getAllModel = await this.getAllInterface.getAll(
        {
          ...httpRequest.params,
          ...normalQueryParams,
        },
      )
      const values = await this.transformData(getAllModel, Object.keys(transformParams))
      // Se a resposta é [] porque algum foi eliminado no processo de permissões, retorna forbidden
      return !values.length
        ? success(values)
        : forbidden(new Error('You do not have permission to access this'))
    } catch (err) {
      console.error(err)
      return serverError(err)
    }
  }
}
