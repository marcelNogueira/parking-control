import { ServerError } from '@/presentation/errors'
import cors from 'cors'

const allowedOrigins = [
  process.env.CLIENT_DOMAIN_URL,
]
const origin = () => {
  if (process.env.name === 'STAGING' || process.env.name === 'PRODUCTION') {
    return function (origin, callback) {
      // console.log(origin)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new ServerError(msg), false)
      }
      return callback(null, true)
    }
  } else {
    return '*'
  }
}

export const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'x-access-token',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: origin(),
}

export const Cors = cors(options)
