import { Request, Response } from 'express'
import User from '../models/User'
import * as yup from 'yup'

class AuthController {

    public async register(req: Request, res: Response) {
        const { name, email, password } = req.body
        //Validate Schema
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6)
        })

        //Validating user data
        try {
            schema.validateSync({ name, email, password })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

        try {
            let user = await User.findOne({ where: { email: email } })
            //Checking if email is in use
            if (user) return res.status(400).json({ message: 'Email already in use!' })
            //Registering new user
            user = new User()
            const createdUser = await user.register(name, email, password)

            res.json(createdUser)
        } catch (error) {
            res.status(500).json({ message: 'Internal error!'})
        }

    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body
        const user = new User()

        const token = await user.login(email, password)
        if (!token) return res.status(400).json({ message: 'Password or Email invalid!' })

        res.json(token)
    }
}

export default new AuthController()