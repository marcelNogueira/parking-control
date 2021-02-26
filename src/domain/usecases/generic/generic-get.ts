import { QueryFilters } from '@/presentation/helpers/types'

export interface GenericGetInterface<BaseT> {
  get(id: number, params?: QueryFilters): Promise<BaseT>
}
