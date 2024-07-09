const inquirer = require("inquirer");
//const mysql = require('mysql2');
const Table = require("cli-table3");
const mysql = require('mysql2/promise');

//const { default: Choice } = require("inquirer/lib/objects/choice");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employee_tracker"
});
// console.log(db)
console.log("employee_tracker database connected")

const TABLE_HEADERS = {
    DEPARTMENTS: ["Department ID", "Department Name"],
    ROLES: ["Role ID, Job Title", "Department Name", "Salary"],
    EMPLOYEES: ["Employee ID", "First Name", "Last Name", "Jobe Title"],
};

async function activateApp() {
    const options = await inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Please make a selection",
            choices: [
                "View All Departments",
                "Add a Department",
                "View All Roles",
                "Add A Role",
                "View All Employees",
                "Add An Employee",
                "Update An Employee Role",
                "End",
            ]
        }
    ]);

    switch (options.options) {
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add a Department":
            addADepartment();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "Add A Role":
            addARole();
            break;
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add An Employee":
            addAnEmployee();
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
    try {
        const departments = await db.query("SELECT * FROM department");
        const table = new Table(TABLE_HEADERS.DEPARTMENTS);
        console.log(departments)
        const result = departments.map(row => table.push([row.id, row.name]));
        console.log(result)
        console.log(table.toString());
        if (result) {
            activateApp();

        }

    } catch (err) {
        console.log(err)
    }
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

async function viewAllEmployees() {
    const employees = await db.query(`
        SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            role.salary,
            CONCAT(manager.first_name," ", manager.last_name) AS manager
            FROM employee
            INNER JOIN role
            ON employee.role_id = role.id
            LEFT JOIN employee AS manager
            ON employee.manager_id = manager.id
            LEFT JOIN department 
            ON role.department_id = department.id;
            `);
        console.log(employees)
    const table = new Table(TABLE_HEADERS.EMPLOYEES);
    employees.forEach(row => {
        if (row.manager === null) {
            row.manager = "None";
        }
        table.push([row.id, row.first_name, row.last_name, row.title, row.department_name, row.salary, row.manager])
    });
    console.log(table.toString());
    activateApp();

}

async function addADepartment() {
    const department = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter department name"
        }
    ]);

try {
    await db.query("INSERT INTO department SET ?", department);
    console.log("Department Added Successfully!");
    activateApp();
} catch (err) {
    console.log(err)
    }
}

async function addARole() {
    const role = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "salary",
            type: "number",
            message: "Enter role salary"
        },
        {
            name: "department_id",
            type: "number",
            message: "Enter department ID"
        }
    ]);

    try {
        await db.query("INSERT INTO role SET ?", role);
        console.log("Role Added Successfully!");
        activateApp();
    } catch (err) {
        console.log(err)
        }
}

async function addAnEmployee() {
    const role = await inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter employee last name"
        },
        {
            name: "role_id",
            type: "number",
            message: "Enter role ID"
        },
        {
            name: "manager_id",
            type: "number",
            message: "Enter manager ID (optional)"
        }
    ]);

    try {
        await db.query("INSERT INTO employees SET ?", employee);
        console.log("Employee Added Successfully!");
        activateApp();
    } catch (err) {
        console.log(err)
        }
}




activateApp()











