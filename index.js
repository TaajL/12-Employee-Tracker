const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("cli-table3");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"....",
    database: "employee_tracker";
});
console.log("employee_tracker database connected")

const TABLE_HEADERS ={
    DEPARTMENTS: ["Department ID", "Department Name"],
    ROLES: ["Role ID, Job Title", "Department Name", "Salary"],
    EMPLOYEES: ["Employee ID", "First Name", "Last Name", "Jobe Title"],
};

async function activateApp() {
    const options = await inquirer.prompt ([
        {
        name: "options",
        type: "list",
        message: "Please make a selection"
        choices: [
            "View All Departments",
            "Add a Department",
            "View All Roles",
            "Add A Role",
            "View All Employees",
            "Add An Employee",
            "Update An Employee Role",
            "End"
        ] 
    }
]);
    


