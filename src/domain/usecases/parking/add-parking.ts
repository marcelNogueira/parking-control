import { ParkingModel } from '@/domain/models/parking'
import { GenericAddInterface } from '@/domain/usecases/generic'

export type AddParkingModel = Omit<ParkingModel, 'id' | 'createdAt'>

export type AddParkingResponseModel = { parkingNumber: number }

export type AddParking = GenericAddInterface<ParkingModel, AddParkingModel>
