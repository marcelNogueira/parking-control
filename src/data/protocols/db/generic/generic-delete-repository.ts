export interface GenericDeleteRepository<BaseT> {
  delete(id: number): Promise<BaseT>
}
