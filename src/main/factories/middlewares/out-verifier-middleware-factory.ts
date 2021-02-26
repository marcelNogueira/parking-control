import { DbGetParking } from '@/data/usecases/parking'
import { ParkingPostgresRepository } from '@/infra/db/postgres/repositories/parking'
import { OutVerifierMiddleware } from '@/presentation/middlewares/out-verifier-middleware'

export const makeOutVerifierMiddleware = (): OutVerifierMiddleware => {
  const parkingPostgresRepository = new ParkingPostgresRepository()
  const dbGetParking = new DbGetParking(parkingPostgresRepository)
  return new OutVerifierMiddleware(dbGetParking)
}
