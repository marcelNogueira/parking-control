import { Express } from 'express'
import { bodyParser, contentType, Cors } from '../middlewares'

export default (app: Express): void => {
  app.use(Cors)
  app.use(bodyParser)
  app.use(contentType)
}
