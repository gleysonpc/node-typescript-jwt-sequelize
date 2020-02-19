import { Model, DataTypes } from 'sequelize'
import { database } from '../config/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class User extends Model {

    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public token!: string | null

    //timestamps
    public readonly created_at!: Date
    public readonly updated_at!: Date

    //Regiser method
    public async register(name: string, email: string, password: string): Promise<false | User> {
        if (!name && email && password) return false

        const user = await User.create({
            name,
            email,
            password
        })
        return user
    }

    //Login method
    public async login(email: string, password: string): Promise<false | User> {
        const user = await User.findOne({
            where: {
                email: email

            }
        })
        //Checking Email
        if (!user) return false
        //Checking Password
        const validPass = bcrypt.compareSync(password, user.password)
        if (!validPass) return false
        //Get Token
        const token = this.generateToken()
        user.token = token
        return user
    }

    //Generate access token
    public generateToken(): string {
        const data = {
            id: this.id,
            name: this.name,
            email: this.email,
        }
        const token = jwt.sign(data, process.env.TOKEN_SECRET as string)
        return token
    }
}

//Init Model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        sequelize: database,
        underscored: true
    }
)

//Encrypting password
User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync(10)
    const encPass = bcrypt.hashSync(user.password, salt)
    user.password = encPass
})



export default User
