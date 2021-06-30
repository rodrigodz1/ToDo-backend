const Task = (sequelize, DataTypes) => {
    let task = sequelize.define(
        "Task",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "tasks",
            timestamps: true,
        }
    )

    task.associate = (models) => {
        task.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "task_user",
        });
    }

    return task;
}

module.exports = Task