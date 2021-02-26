import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddParkingController, makePayParkingController } from '@/main/factories/parking'
// import { makeAdminNewPasswordEmailController } from '../factories/user/password/admin-new-password-email-factory'
// import { makeGetAllUsersController } from '../factories/user/get/get-all-users-controller-factory'
// import { makeGetUserController } from '../factories/user/get/get-user-controller-factory'
// import { makeGetUsersByCompanyIdFactory } from '../factories/user/get/get-users-by-company-id-factory'
// import { makeLoginController } from '../factories/user/login/login-controller-factory'
// import { resetPasswordController } from '../factories/user/password/reset-password-factory'
// import { sendRecoveryEmailController } from '../factories/user/password/send-recovery-password-email-factory'
// import { makeSignupController } from '../factories/user/signup/signup-controller-factory'
// import { updatePasswordController } from '../factories/user/password/update-password-controller-factory'
// import { auth, adminAuth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/parking', adaptRoute(makeAddParkingController()));
  router.patch('/parking/:id/pay', adaptRoute(makePayParkingController()));
}
