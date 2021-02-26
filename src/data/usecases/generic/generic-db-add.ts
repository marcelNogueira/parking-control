import { GenericAddRepository } from '@/data/protocols/db/generic/generic-add-repository'

export class GenericDbAdd<BaseT, AddT> {
  constructor (private readonly addRepository: GenericAddRepository<BaseT, AddT>) {}
  async add (model: AddT): Promise<BaseT> {
    return await this.addRepository.add(model)
  }
}
