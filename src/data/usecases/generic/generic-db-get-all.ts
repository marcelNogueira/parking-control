import { GenericGetAllRepository } from '@/data/protocols/db/generic/generic-get-all-repository'
import { QueryFilters } from '@/presentation/helpers/types'

export class GenericDbGetAll<BaseT> {
  constructor(private readonly repository: GenericGetAllRepository<BaseT>) {}
  async getAll(filters: QueryFilters): Promise<BaseT[]> {
    return await this.repository.getAll(filters)
  }
}
