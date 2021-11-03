const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
  prompt([
    {
      type: "list",
      name: "menu",
      message: "Please select from the following options:",
      choices: [
        {
          name: "View all departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View all roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add new department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add new role",
          value: "ADD_ROLE",
        },
        {
          name: "Add new employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update employee role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let menu = res.menu;
    switch (menu) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;

      case "VIEW_ROLES":
        viewRoles();
        break;

      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;

      case "ADD_DEPARTMENT":
        addDepartment();
        break;

      case "ADD_ROLE":
        addRole();
        break;

      case "ADD_EMPLOYEE":
        addEmployee();
        break;

      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;

      default:
        quit();
    }
  });
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => init());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => init());
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => init());
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Please enter department name",
    },
  ]).then((res) => {
    let name = res;
    db.addDepartment(name)
      .then(() =>
        console.log(`--- New department, ${name.name}, added to the database ---`)
      )
      .then(() => init());
  });
}

function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentList = departments.map(({ id, name }) => ({
      name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "Please enter role title",
      },
      {
        name: "salary",
        message: "Please enter role salary",
      },
      {
        type: "list",
        name: "department_id",
        message: "Please choose the role's department",
        choices: departmentList,
      },
    ]).then((role) => {
      db.addRole(role)
        .then(() => console.log(`--- New role, ${role.title}, added to database ---`))
        .then(() => init());
    });
  });
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Please enter employee's first name",
    },
    {
      name: "last_name",
      message: "Please enter employee's last name",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleList = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "Please choose the employee's role",
        choices: roleList,
      }).then((res) => {
        let roleId = res.roleId;

        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerList = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerList.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Please choose the employee's manager",
            choices: managerList,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.addEmployee(employee);
            })
            .then(() =>
              console.log(
                `--- New employee, ${firstName} ${lastName}, added to database ---`
              )
            )
            .then(() => init());
        });
      });
    });
  });
}

function updateEmployeeRole() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeList = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Please choose the employee you'd like to update",
        choices: employeeList,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleList = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Please choose new role for the employee",
            choices: roleList,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() =>
            console.log(`--- Employee updated ---`)
          )
          .then(() => init());
      });
    });
  });
}

function quit() {
    console.log("--- Thank you for using the Employee Management Tracker, have a great day! ---");
    process.exit();
}