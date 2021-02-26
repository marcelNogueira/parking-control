export interface MockFactoryInterface<BaseT, AddT, UpdateT> {
  makeMockModel(): BaseT
  makeMockAddModel(): AddT
  makeMockUpdateModel(): UpdateT
  makeMockModelArray(): BaseT[]
  makeMockAddModelArray(): AddT[]
}
