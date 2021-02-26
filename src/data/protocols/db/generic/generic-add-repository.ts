export interface GenericAddRepository<BaseT, AddT> {
  add(model: AddT): Promise<BaseT>
}
