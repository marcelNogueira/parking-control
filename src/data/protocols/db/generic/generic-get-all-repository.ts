import { QueryFilters } from '@/presentation/helpers/types'

export interface GenericGetAllRepository<BaseT> {
  getAll(filters: QueryFilters): Promise<BaseT[]>
}
