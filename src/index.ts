import inquirer from "inquirer";
// import pg from "pg";
import { pool, connectToDb } from "./db/connection.js";

async function viewAllEmployees() {
  try {
    const empData = await pool.query(
      "SELECT e.id AS employee_id, e.employee_first_name AS employee_first_name, e.employee_last_name AS employee_last_name, m.employee_first_name AS manager_first_name, m.employee_last_name AS manager_last_name FROM employee e LEFT JOIN   employee m ON e.manager_id = m.id;"
    ); // ADD MANAGER TO JOINED TABLE
    console.table(empData.rows); // Displays pretty table
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addEmployee() {
  const { firstName, lastName } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter employees first name.",
      validate: (input) => input.trim() !== "" || "First name cannot be empty.",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter employees last name.",
      validate: (input) => input.trim() !== "" || "Last name cannot be empty.",
    },
  ]);

  try {
    await pool.query(
      "INSERT INTO employee (employee_first_name, employee_last_name) VALUES ($1, $2)",
      [firstName, lastName]
    );
    console.log(`Success! ${firstName} ${lastName} was added.`);
  } catch {
    console.log("Error adding employee");
  }
}

async function selectEmployee() {
  try {
    // list emp
    const chosenEmp = await pool.query(
      "SELECT id, employee_first_name, employee_last_name FROM employee"
    );
    const employees = chosenEmp.rows;

    // choose emp prompt
    const { employeeId } = await inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Please choose an employee",
        choices: employees.map((emp) => ({
          name: `${emp.employee_first_name} ${emp.employee_last_name}`,
          value: emp.id,
        })),
      },
    ]);
    return employeeId; //return emp
  } catch (error) {
    console.error("Error selecting employee", error);
  }
}

async function updateEmployeeRole() {
  try {
    const employeeId = await selectEmployee();
    if (!employeeId) {
      console.error("No employee selected.");
      return;
    } //get employee

    const roleData = await pool.query("SELECT id, role_title FROM role");
    const roles = roleData.rows;

    const { roleId } = await inquirer.prompt([
      {
        type: "list",
        name: "roleId",
        message: "Please choose a new role for this employee",
        choices: roles.map((role) => ({
          name: `${role.role_title}`,
          value: role.id,
        })),
      },
    ]);

    // Update the employee's role
    await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [
      roleId,
      employeeId,
    ]);

    console.log(`${employeeId} role has been updated to ${roleId}"`);
  } catch (error) {
    console.error("Error", error);
  }
}

async function viewAllRoles() {
  try {
    const roleData = await pool.query("SELECT * FROM role");
    console.table(roleData.rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addRole() {
  const { title, salary } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter new role title",
      validate: (input) => input.trim() !== "" || "Title cannot be empty.",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter new role salary.",
      validate: (input) => input.trim() !== "" || "Salary cannot be empty.",
    },
  ]);

  try {
    await pool.query(
      "INSERT INTO role (role_title, role_salary) VALUES ($1, $2)",
      [title, salary]
    );
    console.log(
      `Success! New role ${title} with salary of ${salary} was added`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

async function viewAllDepartments() {
  try {
    const departmentData = await pool.query("SELECT * FROM department");
    console.table(departmentData.rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addDepartments() {
  const { departmentName } = await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Enter department name",
      validate: (input) =>
        input.trim() !== "" || "Department name cannot be empty.",
    },
  ]);

  try {
    await pool.query("INSERT INTO department (department_name) VALUES ($1)", [
      departmentName,
    ]);
    console.log(`Success! New department ${departmentName} was added`);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function menu() {
  await connectToDb();
  let Quit = false;

  while (!Quit) {
    const { select } = await inquirer.prompt([
      {
        type: "list",
        name: "select",
        message: "Please make a selection:",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Departments",
          "Quit",
        ],
      },
    ]);

    switch (select) {
      case "View All Employees":
        await viewAllEmployees();
        break;
      case "Add Employee":
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateEmployeeRole();
        break;
      case "View All Roles":
        await viewAllRoles();
        break;
      case "Add Role":
        await addRole();
        break;
      case "View All Departments":
        await viewAllDepartments();
        break;
      case "Add Departments":
        await addDepartments();
        break;
      case "Quit":
        Quit = true;
        await pool.end();
        return;
    }
  }
}
menu();
