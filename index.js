const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("cli-table3");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"....",
    database: "employee_tracker";
})
console.log("employee_tracker database connected")
    

