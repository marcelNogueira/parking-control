import { ParkingModel } from '@/domain/models/parking'
import { GenericGetAllInterface } from '@/domain/usecases/generic'

export type GetHistoryParkingByPlateModel = Pick<Partial<ParkingModel>, 'createdAt'> & Omit<ParkingModel, 'plate' | 'createdAt'>
export type GetHistoryParkingByPlate = GenericGetAllInterface<ParkingModel>
