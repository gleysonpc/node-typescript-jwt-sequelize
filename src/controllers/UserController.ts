import { Request, Response } from 'express'
import User from '../models/User'


class UserController {

    public async index(req: Request, res: Response) {
        const users = await User.findAll()
        res.json(users)
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params
        const user = await User.findByPk(id)
        res.json(user)
    }

    public async store(req: Request, res: Response) {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password
        })

        res.json(user)
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, email } = req.body

        let user = await User.findByPk(id)
        await user?.update({ name, email })
        res.json(user)

    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params
        let user = await User.findByPk(id)
        await user?.destroy()
        res.json(user)
    }
}

export default new UserController()