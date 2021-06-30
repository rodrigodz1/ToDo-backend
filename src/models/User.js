const User = (sequelize, DataTypes) => {
    let user = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(250),
                allowNull: true,
            },
        },
        {
            tableName: "users",
            timestamps: true,
        }
    )

    user.associate = (models) => {
        user.hasMany(models.Task, {
            foreignKey: "user_id",
            as: "task_user"
        })
    }

    return user;
}

module.exports = User