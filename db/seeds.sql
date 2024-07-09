INSERT INTO department (name)
VALUES
    ('Head of IT'),
    ('Security Engineer Manager'),
    ('Network Engineer Manager'),
    ('Help Desk Manager'),
    ('Security Engineer'),
    ('IT Help Technician');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Head of IT', 500000.00, 1),
    ('Security Engineer', 350000.00, 2),
    ('Network Engineer', 350000.00, 3),
    ('Help Desk Leader', 150000.00, 4),
    ('SCRUM Master', 200000.00, 5),
    ('IT Help Technician', 85000.00, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Jaliyah', 'McFarland', 1),
    ('Cataleya', 'Olson', 2),
    ('Malachi', 'Velazquez', 3),
    ('Dane', 'Allen', 4),
    ('Riley', 'Wade', 5),
    ('Jake', 'Velez', 6);

UPDATE employee
SET manager_id = 1
WHERE id BETWEEN 2 AND 6;
