DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- \c employee_db;

/*//TODO: Create a department table */
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL
);

/*//TODO: Create a role table */
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  role_title VARCHAR(30) UNIQUE NOT NULL,
  role_salary INTEGER NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

/*//TODO: Create a employee table */
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
