module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1]
        }},
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        full_name: DataTypes.STRING,
      },{hooks: {beforeCreate: (user) => {user.full_name = `${user.first_name} ${user.last_name}`}}});

    Employee.associate = function(models) {

      Employee.belongsTo(models.Employee, {
        as: 'Manager',
      });
      Employee.belongsTo(models.Role);

    };

    return Employee;
  };
  