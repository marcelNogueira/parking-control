import { ParkingModel } from '@/domain/models/parking'
import { UpdateParkingModel } from '@/domain/usecases/parking'
import { GenericUpdateRepository } from '@/data/protocols/db/generic/generic-update-repository'

export type UpdateParkingRepository = GenericUpdateRepository<
  ParkingModel,
  UpdateParkingModel
>
