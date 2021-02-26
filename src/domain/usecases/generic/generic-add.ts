export interface GenericAddInterface<BaseT, AddT> {
  add (model: AddT): Promise<BaseT>
}
