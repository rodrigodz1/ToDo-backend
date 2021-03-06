const jwt = require('jsonwebtoken')
const { Task, User } = require("../models")

module.exports = {

    async createTask(request, response) {
        try {
            let accesstoken = request.headers.accesstoken

            let result = jwt.verify(accesstoken, process.env.JWT_SECRET)

            if (!result){
                return response.status(403).json({ msg: "Token invalido/expirado" })
            }

            let findUser = await User.findOne({
                where: { id: result.id }
            })

            if (!findUser) {
                return response.status(403).json({ msg: "Usuario referenciado não existe" })
            }
            else {
                request.body.user_id = result.id
                const task = await Task.create(request.body)

                return response.status(201).json(task)
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async getTasks(request, response) {
        try {
            let accesstoken = request.headers.accesstoken

            let result = jwt.verify(accesstoken, process.env.JWT_SECRET)

            if (!result){
                return response.status(403).json({ msg: "Token invalido/expirado" })
            }

            let tasks = await Task.findAll({
                where: { user_id: result.id }
            })

            if (tasks == "") {
                return response.status(403).json({ msg: "Usuario não possui tasks cadastradas" })
            }
            else {
                return response.status(201).json(tasks)
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async getAllTasks(request, response) {
        try {
            let accesstoken = request.headers.accesstoken

            let result = jwt.verify(accesstoken, process.env.JWT_SECRET)

            if (!result){
                return response.status(403).json({ msg: "Token invalido/expirado" })
            }

            let findUser = await User.findOne({
                where: { id: result.id }
            })

            if (findUser.is_superuser === true){
                let tasks = await Task.findAll()
                
                return response.status(200).json({ tasks: tasks })
            } else {
                return response.status(403).json({ msg: "Você não é administrador." })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async getOneTask(request, response) {
        try {

            let decodedToken = jwt.decode(request.headers.accesstoken)

            let task_id = request.params.id
            let task = await Task.findOne({
                where: { id: task_id }
            })

            if (task) {
                if (decodedToken.id !== task.user_id) {
                    return response.status(403).json({ msg: "Usuário não tem permissão para visualizar essa task." })
                } else {
                    return response.json(task)
                }
            } else {
                return response.status(404).json({ msg: "Task não encontrada" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async update(request, response) {
        try {
            let decodedToken = jwt.decode(request.headers.accesstoken)

            let task_id = request.params.id
            let task = await Task.findOne({
                where: { id: task_id }
            })

            if (task) {
                if (decodedToken.id !== task.user_id) {
                    return response.status(403).json({ msg: "Usuário não tem permissão para editar essa task." })
                } else {
                    await Task.update({
                        name: request.body.name,
                        description: request.body.description
                    }, {
                        where: {
                            id: task.id
                        }
                    })
                    response.json({ msg: "Tarefa atualizada com sucesso!" })
                }

            } else {
                response.status(404).json({ msg: "A tarefa a ser atualizada não existe" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    },

    async delete(request, response) {
        try {
            let accesstoken = request.headers.accesstoken

            let result = jwt.verify(accesstoken, process.env.JWT_SECRET)

            let task_id = request.params.id
            let task = await Task.findOne({
                where: { id: task_id }
            })

            let currentUser = await User.findOne({
                where: { id: result.id }
            })

            if (task) {

                if (currentUser.is_superuser === true || result.id === task.user_id){
                    await Task.destroy({
                        where: {
                            id: task.id
                        }
                    })

                    return response.json({ msg: "Task removida com sucesso" })
                }
                else {
                    return response.status(403).json({ msg: "Usuário não tem permissão para remover essa task." })
                }



            } else {
                return response.status(404).json({ msg: "Task a ser removida não encontrada" })
            }

        } catch (error) {
            return response.status(400).json({ msg: "Erro: " + error })
        }
    }



}