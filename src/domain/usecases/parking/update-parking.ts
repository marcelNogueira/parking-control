import { ParkingModel } from '@/domain/models/parking'
import { GenericUpdateInterface } from '@/domain/usecases/generic'

export type UpdateParkingModel = Omit<ParkingModel, 'id' | 'createdAt' | 'plate' >
export type UpdateParking = GenericUpdateInterface<ParkingModel, UpdateParkingModel>
