module.exports = function(sequelize, DataTypes) {
    var Department= sequelize.define("Department", {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          len: [1]
        }
      },
    });

    Department.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Department.hasMany(models.Role, {
        onDelete: "cascade"
      });
    };

    return Department;
  };
  