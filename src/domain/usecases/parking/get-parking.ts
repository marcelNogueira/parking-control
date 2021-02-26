import { ParkingModel } from '@/domain/models/parking'
import { GenericGetInterface } from '@/domain/usecases/generic'

export type GetParking = GenericGetInterface<ParkingModel>
