import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddParkingController, makePayParkingController } from '@/main/factories/parking'
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeOutVerifierMiddleware } from '../factories/middlewares/out-verifier-middleware-factory';
import { makeOutParkingController } from '../factories/parking/out-parking-factory';

export default (router: Router): void => {
  router.post('/parking', adaptRoute(makeAddParkingController()));
  router.patch('/parking/:id/pay', adaptRoute(makePayParkingController()));
  router.patch('/parking/:id/out', adaptMiddleware(makeOutVerifierMiddleware()), adaptRoute(makeOutParkingController()));
}
