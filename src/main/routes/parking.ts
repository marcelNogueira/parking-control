import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddParkingController, makeGetHistoryParkingController, makePayParkingController, makeOutParkingController } from '@/main/factories/parking'
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeOutVerifierMiddleware } from '../factories/middlewares';

export default (router: Router): void => {
  router.post('/parking', adaptRoute(makeAddParkingController()));
  router.patch('/parking/:id/pay', adaptRoute(makePayParkingController()));
  router.patch('/parking/:id/out', adaptMiddleware(makeOutVerifierMiddleware()), adaptRoute(makeOutParkingController()));
  router.get('/parking/:plate', adaptRoute(makeGetHistoryParkingController()));
}
