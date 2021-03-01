export interface MockFactoryInterface<BaseT, AddT, UpdateT> {
  makeMockModel(): BaseT
  makeMockAddModel(): AddT
  makeMockUpdateModel(): UpdateT
  makeMockModelArray(): any[]
  makeMockAddModelArray(): AddT[]
}
