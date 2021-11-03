const { prompt } = require('inquirer');
const db = require('./db');
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
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add new department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add new role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add new employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                }
            ]
        }
    ])
}