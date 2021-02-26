import { QueryFilters } from '@/presentation/helpers/types'
import { HttpRequest } from '@/presentation/protocols'

export const getQueryParams = (httpRequest: HttpRequest): QueryFilters => {
  return httpRequest.query
    ? Object.assign(
        {},
        ...Object.entries(httpRequest.query).map(
          /* Mapeando para que parâmetros sem valor sejam lidos apenas como true */
          ([key, value]) => ({ [key]: value || true })
        )
      )
    : undefined
}
