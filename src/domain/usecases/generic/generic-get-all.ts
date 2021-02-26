import { QueryFilters } from '@/presentation/helpers/types'

export interface GenericGetAllInterface<BaseT> {
  getAll(filters: QueryFilters): Promise<BaseT[]>
}
