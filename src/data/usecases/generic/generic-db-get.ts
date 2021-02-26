import { GenericGetRepository } from '@/data/protocols/db/generic/generic-get-repository'
import { QueryFilters } from '@/presentation/helpers/types'

export class GenericDbGet<BaseT> {
  constructor(private readonly getRepository: GenericGetRepository<BaseT>) {}
  async get(id: number, params?: QueryFilters): Promise<BaseT> {
    return await this.getRepository.get(id, params)
  }
}
