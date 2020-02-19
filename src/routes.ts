import { Router } from 'express'
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'
const routes = Router()


routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

export default routes