
module.exports = {
    //url: process.env.DEV_DATABASE_URL,
    username: "rodrigo",
    password: "test",
    database: "trabalho",
    host: "pgsql-seg",
    dialect: "postgres",
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
