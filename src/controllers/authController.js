const jwt = require('jsonwebtoken')
const { User } = require("../models")

module.exports = {

    async login(request, response) {
        try {
            let user = request.body

            let findUser = await User.findOne({
                where: { email: request.body.email }
            })

            if (!findUser) {
                return response.status(403).json({ msg: "Usuario nao encontrado" })
            }
            else if (user.password === findUser.password) {
                const id = findUser.id
                console.log("Você está logado");
                const token = jwt.sign({ id }, "ULTRASUPERSECRETKEYDOAPP", {
                    expiresIn: 300 //5 min
                })

                return response.json({ accesstoken: token })
            } else {
                return response.status.json({ msg: "Senha incorreta" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async logout(request, response) {
        try {
            let user = request.body

            let findUser = await User.findOne({
                where: { email: request.body.email }
            })

            if (!findUser) {
                return response.status(403).json({ msg: "Usuario nao encontrado" })
            } else {
                return response.status(200).json({ msg: "OK, usuario deslogado" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async register(request, response) {
        try {
            //TO-DO: encryptar senha e usar salt antes de gravar na db
            const user = await User.create(request.body)
            let id = user.id

            const token = jwt.sign({ id }, "ULTRASUPERSECRETKEYDOAPP", {
                expiresIn: 300 //5 min
            })


            return response.status(201).json({ user: user, accesstoken: token })

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async verifyJWT(request, response) {
        try {
            let accesstoken = request.body.accesstoken

            let result = jwt.verify(accesstoken, "ULTRASUPERSECRETKEYDOAPP")

            if (!result) {
                return response.status(403).json({ msg: "token expirado" })
            }

            let user = await User.findOne({
                where: {
                    id: result.id
                }
            })

            if (user) {
                return response.status(200).json({ user: user })
            } else {
                return response.status(404).json({ msg: "Usuário não encontrado" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    }

}