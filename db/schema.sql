DROP DATABASE IF EXISTS employee_tracker; 
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
        REFERENCES department(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);



