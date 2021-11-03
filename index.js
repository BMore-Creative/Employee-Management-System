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
    
}