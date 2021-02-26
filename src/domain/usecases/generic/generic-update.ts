export interface GenericUpdateInterface<BaseT, UpdateT> {
  update (id: number, model: UpdateT): Promise<BaseT>
}
