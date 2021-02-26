import { ParkingModel } from '@/domain/models/parking'
import { GenericUpdateInterface } from '@/domain/usecases/generic'

export type PayParkingModel = { paid: boolean }
export type PayParking = GenericUpdateInterface<ParkingModel, PayParkingModel>
