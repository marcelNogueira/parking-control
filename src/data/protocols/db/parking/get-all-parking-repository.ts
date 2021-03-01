import { ParkingModel } from '@/domain/models/parking'

import { GenericGetAllRepository } from '@/data/protocols/db/generic/generic-get-all-repository'

export type GetAllParkingRepository = GenericGetAllRepository<
  ParkingModel
>
