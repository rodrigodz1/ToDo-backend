const jwt = require('jsonwebtoken')
const { User } = require("../models")
const bcrypt = require("bcrypt")

module.exports = {

    async login(request, response) {
        try {
            const user = request.body

            const findUser = await User.findOne({
                where: { email: request.body.email }
            })

            const PwdCheck = await bcrypt.compare(
                user.password,
                findUser.password
            );

            if (!findUser) {
                return response.status(403).json({ msg: "Usuario nao encontrado" })
            }
            else if (PwdCheck) {
                const id = findUser.id
                console.log("Você está logado");
                const token = jwt.sign({ id }, "ULTRASUPERSECRETKEYDOAPP", {
                    expiresIn: 600 //10 min
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
            
            const salt = await bcrypt.genSalt(10);
            request.body.password = bcrypt.hashSync(request.body.password, salt);

            if (request.body.is_superuser === true){
                return response.status(403).json({ msg: "Você não tem permissão para criar um administrador."})
            }

            //TO-DO: encryptar senha e usar salt antes de gravar na db
            const user = await User.create(request.body)
            let id = user.id

            const token = jwt.sign({ id }, "ULTRASUPERSECRETKEYDOAPP", {
                expiresIn: 600 //10 min
            })


            return response.status(201).json({ user: user, accesstoken: token })

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async registerSuperuser(request, response) {
        try {
            let accesstoken = request.headers.accesstoken

            let result = jwt.verify(accesstoken, "ULTRASUPERSECRETKEYDOAPP")

            if (!result) {
                return response.status(403).json({ msg: "token invalido/expirado" })
            } else {
                let userRequisitante = await User.findOne({
                    where: {
                        id: result.id
                    }
                })

                if (userRequisitante.is_superuser === true) {
                    const new_user = await User.create(request.body)
                    return response.status(201).json({ msg: "Novo administrador registrado com sucesso." })
                } else {
                    return response.status(403).json({ msg: "Requer privilégio de administrador." })
                }
                /*  garante que apenas um superuser possa registrar outro superuser
                    o primeiro superuser, então, deve ser cadastrado diretamente
                    pelo banco.
                */
            }

            /*
            TO-DO: encryptar senha e usar salt antes de gravar na db
            
            let id = user.id

            const token = jwt.sign({ id }, "ULTRASUPERSECRETKEYDOAPP", {
                expiresIn: 600 //10 min
            })


            return response.status(201).json({ user: user, accesstoken: token })
            */

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