const db = require('./models');
const deptList = require('./data/departmentList.json');
const roleList = require('./data/roleList.json');
const employeeList = require('./data/employeeList.json');

db.sequelize.sync().then( () =>{
    db.Department.bulkCreate(deptList).then( () => {
        db.Role.bulkCreate(roleList).then( () => {
            db.Employee.bulkCreate(employeeList, {individualHooks: true} ).then( () => {
                console.log('Success!');
            });
        });
    });
});