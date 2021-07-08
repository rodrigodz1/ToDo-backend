const path = require("path");

require("dotenv").config({
    path:
      path.resolve(__dirname, "../../.env"),
  });

if (!process.env.NODE_ENV){
    console.log("Inicializando banco de dados...")
}
else if (process.env.NODE_ENV == 'dev'){
    
      
      console.log("Ambiente de desenvolvimento selecionado.");
      
      module.exports = {
          //url: process.env.DATABASE_URL,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB,
          host: process.env.DB_HOST,
          dialect: "postgres",
          define: {
              timestamps: true,
              underscored: true,
          },
          logging: false,
      };

} else if (process.env.NODE_ENV == 'prod') {

    console.log("Ambiente de produção selecionado.");

    module.exports = {
        url: process.env.DATABASE_URL,
        //username: process.env.DB_USER,
        //password: process.env.DB_PASS,
        //database: process.env.DB,
        //host: process.env.DB_HOST,
        dialect: "postgres",
        define: {
            timestamps: true,
            underscored: true,
        },
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    };

} else {
    console.log("Erro desconhecido");
}


