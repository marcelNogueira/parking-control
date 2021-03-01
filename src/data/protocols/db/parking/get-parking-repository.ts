import { ParkingModel } from '@/domain/models/parking'

import { GenericGetRepository } from '@/data/protocols/db/generic/generic-get-repository'

export type GetParkingRepository = GenericGetRepository<ParkingModel>
