module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("Role", {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
        salary: {
            type: DataTypes.DECIMAL
        }
    });

    Role.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Role.belongsTo(models.Department);
      Role.hasMany(models.Employee);
    };

    return Role;
  };
  