const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("cli-table3");
const { default: Choice } = require("inquirer/lib/objects/choice");

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

switch (options.options) {
    case "View All Departments":
        viewAllDepartments();
         break;
    case "Add a Departments":
        addADepartments();
        break;
    case "View All Roles":
        viewAllRoles();
         break;
    case "Add A Role":
        addARole();
        break;
    case "View All Employees":
         viewAllEmployeees();
        break;
    case "Add A Employee":
         addAEmployee();
        break;
    case "Update An Employee Role":
         updateAnEmployeeRole();
        break;
    default: 
        console.log("Employee Manager App Here for You!")
        return;      
    }
}

async function viewAllDepartments() {
    const departments = await db.query("SELECT * FROM department");
    const table = new Table (TABLE_HEADERS.DEPARTMENTS);
    departments.forEach(row => table.push([row.id, row.name]));
    console.log(table.toString());
    activateApp();
}

async function viewAllRoles() {
    const roles = await db.query(`
        SELECT
            role.id,
            title,
            department.name AS "department_name",
            salary
        FROM role
        INNER JOIN department 
        ON role.department_id =department.id;
    `);
    const table = new Table(TABLE_HEADERS.ROLES);
    roles.forEach(row => table.push([row.id, row.title, row.department_name, row.salary]));
    console.log(table.toString());
    activateApp();
}

async function viewAllEmployeees() {
    const Employees = await db.query(`
        SELECT
            employee.id,
            employye.first_name,
            employee.last_name,
            role.title,
            department.name AS "department_name",
            role.salary
            CONCAT(manager.first_name," ", manger.last_name) AS manager
        FROM employee
        INNER JOIN role
            ON employee.role_id = role.id
        LEFT JOIN employee AS manager
            ON employee.manager_id = manager.id;
    `);
}










    

