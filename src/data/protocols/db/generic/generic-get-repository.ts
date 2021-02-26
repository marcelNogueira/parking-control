import { QueryFilters } from '@/presentation/helpers/types'

export interface GenericGetRepository<BaseT> {
  get(id: number, queryFilters: QueryFilters): Promise<BaseT>
}
