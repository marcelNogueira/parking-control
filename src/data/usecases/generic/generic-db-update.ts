import { GenericUpdateRepository } from '@/data/protocols/db/generic/generic-update-repository'

export class GenericDbUpdate<BaseT, UpdateT> {
  constructor (private readonly updateRepository: GenericUpdateRepository<BaseT, UpdateT>) {}
  async update (id: number, model: any): Promise<BaseT> {
    return await this.updateRepository.update(id, model)
  }
}
