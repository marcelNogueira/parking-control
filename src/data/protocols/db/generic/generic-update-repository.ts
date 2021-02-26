export interface GenericUpdateRepository<BaseT, UpdateT> {
  update(id: number, model: UpdateT): Promise<BaseT>
}
