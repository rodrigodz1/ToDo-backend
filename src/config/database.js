
module.exports = {
    //url: process.env.DATABASE_URL,
    username: "yrigdewgextetg",
    password: "892d210d1aaeb0d1e8e3938f1df1bf6b085ae31d2c1ac0eb219d390d86b30718",
    database: "ddov1flig3fl9l",
    host: "ec2-52-86-25-51.compute-1.amazonaws.com",
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
