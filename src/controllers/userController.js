const jwt = require('jsonwebtoken')
const { User } = require("../models")

module.exports = {

  async getAllUsers(request, response) {

    try {
      let accesstoken = request.headers.accesstoken

      let result = jwt.verify(accesstoken, process.env.JWT_SECRET)

      if (!result){
        return response.status(403).json({ msg: "Token invalido/expirado" })
      }

      let user = await User.findOne({
        where: { id: result.id }
      })

      if (user.is_superuser === true){
        let users = await User.findAll()
        return response.status(200).json({ users: users })
      } else {
        return response.status(403).json({ msg: "Permissões de administrador necessárias." })
      }
      
    } catch (error) {
      return response.status(400).json({ msg: "Erro: " + error })
    }

  },

  

}