import { ParkingModel } from '@/domain/models/parking'
import { GenericUpdateInterface } from '@/domain/usecases/generic'

export type OutParkingModel = { left: boolean, time: string }
export type OutParking = GenericUpdateInterface<ParkingModel, OutParkingModel>
