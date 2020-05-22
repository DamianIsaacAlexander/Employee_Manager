/* eslint-disable class-methods-use-this */
const inquirer = require('inquirer');
const db = require('./models');
const questions = require('./data/questions.js');

class ActionHandler {
  async initLoop() {
    const result = await inquirer.prompt(questions.init);
    await this.resolveAction(result).then(async () => { await this.loop(); });
  }

  async loop() {
    const { again } = await inquirer.prompt(questions.again);

    return again ? this.initLoop() : console.log('Exiting...');
  }

  async resolveAction(result) {
    const action = result.action.split(' ')[0];
    const tName = result.action.split(' ')[1];

    switch (action) {
      case 'View':
        return this.get(tName).then((response) => { console.table(response); });

      case 'Add':
        return this.create(tName);

      case 'Update':
        return this.update();

      case 'Quit':
        return process.exit();

      default:
        return process.exit();
    }
  }

  async create(tName) {
    switch (tName) {
      case 'department':
        return this.addDepartment();
      case 'role':
        return this.addRole();
      case 'employee':
        return this.addEmployee();
      default:
        return process.exit();
    }
  }

  async update() {
    questions.updateEmployee[0].choices.length = 0;
    questions.updateEmployee[1].choices.length = 0;

    questions.updateEmployee[0].choices = await this.updateList('employee');
    questions.updateEmployee[1].choices = await this.updateList('role');

    const updatedEmployeeObj = await inquirer.prompt(questions.updateEmployee);
    updatedEmployeeObj.rId = await this.getId('role', updatedEmployeeObj.role);

    db.Employee.update({ RoleId: updatedEmployeeObj.rId },
      { where: { full_name: updatedEmployeeObj.employee } })
      .then(() => { console.log("Success updated employee's role!"); })
      .catch((err) => { console.log(err); });
  }


  async get(tName) {
    switch (tName) {
      case 'departments':
        return db.Department.findAll({ raw: true });
      case 'roles':
        return db.Role.findAll({ raw: true });
      case 'employees':
        return db.Employee.findAll({ include: [{ model: db.Employee, as: 'Manager', attributes: ['full_name'] }, { model: db.Role, attributes: ['title', 'salary'] }], raw: true });
      default:
        return process.exit();
    }
  }

  async addDepartment() {
    const newDeptObj = await inquirer.prompt(questions.addDepartment);

    db.Department.create({ name: newDeptObj.name })
      .then(() => { console.log('Success new department added!'); })
      .catch((err) => { console.log(err); });
  }

  async addRole() {
    questions.addRole[2].choices.length = 0;
    questions.addRole[2].choices = await this.updateList('department');

    const newRoleObj = await inquirer.prompt(questions.addRole);

    newRoleObj.deptId = await this.getId('department', newRoleObj.department);

    db.Role.create({
      title: newRoleObj.title,
      salary: newRoleObj.salary,
      DepartmentId: newRoleObj.deptId,
    })
      .then(() => { console.log('Success new role added!'); })
      .catch((err) => { console.log(err); });
  }

  async addEmployee() {
    questions.addEmployee[2].choices.length = 0;
    questions.addEmployee[3].choices.length = 0;

    questions.addEmployee[2].choices = await this.updateList('role');
    questions.addEmployee[3].choices = await this.updateList('manager');
    questions.addEmployee[3].choices.push('NA');

    const newEmployeeObj = await inquirer.prompt(questions.addEmployee);

    if (newEmployeeObj.manager === 'NA') {
      newEmployeeObj.mId = null;
    } else {
      newEmployeeObj.mId = await this.getId('manager', newEmployeeObj.manager);
    }

    newEmployeeObj.rId = await this.getId('role', newEmployeeObj.role);

    db.Employee.create({
      first_name: newEmployeeObj.firstName,
      last_name: newEmployeeObj.lastName,
      RoleId: newEmployeeObj.rId,
      ManagerId: newEmployeeObj.mId,
    })
      .then(() => { console.log('Success new employee added!'); })
      .catch((err) => { console.log(err); });
  }

  async updateList(listName) {
    switch (listName) {
      case 'department':
        return db.Department.findAll({ raw: true, attributes: ['name'] }).then((result) => { const departmentList = result.map((result) => result.name); return departmentList; });
      case 'role':
        return db.Role.findAll({ raw: true, attributes: ['title'] }).then((result) => { const roleList = result.map((result) => result.title); return roleList; });
      case 'manager':
        return db.Employee.findAll({ raw: true, attributes: ['full_name'] }).then((result) => { const managerList = result.map((result) => result.full_name); return managerList; });
      case 'employee':
        return db.Employee.findAll({ raw: true, attributes: ['full_name'] }).then((result) => { const employeeList = result.map((result) => result.full_name); return employeeList; });
      default: return process.exit();
    }
  }

  async getId(tName, cName) {
    switch (tName) {
      case 'department':
        return db.Department.findAll({ raw: true, where: { name: cName }, attributes: ['id'] }).then((result) => result[0].id);
      case 'role':
        return db.Role.findAll({ raw: true, where: { title: cName }, attributes: ['id'] }).then((result) => result[0].id);
      case 'manager':
        return db.Employee.findAll({ raw: true, where: { full_name: cName }, attributes: ['id'] }).then((result) => result[0].id);
      default: return process.exit();
    }
  }
}

module.exports = ActionHandler;
