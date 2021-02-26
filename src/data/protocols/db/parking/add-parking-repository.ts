import { ParkingModel } from '@/domain/models/parking'
import { AddParkingModel } from '@/domain/usecases/parking'
import { GenericAddRepository } from '@/data/protocols/db/generic/generic-add-repository'

export type AddParkingRepository = GenericAddRepository<
  ParkingModel,
  AddParkingModel
>
