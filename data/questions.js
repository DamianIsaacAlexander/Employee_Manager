let questions = {
    init:{
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add department', 'Add role', 'Add employee', 'View departments', 'View roles', 'View employees', 'Update employee role', 'Quit']
    },
    again:{ 
            type: "confirm",
            name: "again",
            message: "Perform another action?",
            default: true
    },
    updateEmployee:[
        {
            name: 'employee',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: []
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select a new role',
            choices: []
        }
    ],
    addEmployee:[
      {
        name: 'firstName',
        type: 'input',
        message: "Enter employee's first name"
      }, 
      {
        name: 'lastName',
        message: "Enter employee's last name",
      },
      {
        name: 'role',
        type: 'list',
        message: "Select employee's role",
        choices: []
      },
      {
        name: 'manager',
        type: 'list',
        message: "Select employee's manager",
        choices: []
      }
    ],
    addDepartment:
    {
        name: 'name',
        type: 'input',
        message: "Enter new department name",
    },
    addRole:[
        {
            name: 'title',
            type: 'input',
            message: "Enter new role name",
        },
        {
            name: 'salary',
            type: 'input',
            message: "Enter role salary",
        },
        {
            name: 'department',
            type: 'list',
            message: 'Select role department',
            choices: []
        }
    ],
}

module.exports = (questions);