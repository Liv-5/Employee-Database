import inquirer from "inquirer";
// import pg from "pg";
import { pool, connectToDb } from "./db/connection.js";

async function viewAllEmployees() {
  try {
    const empData = await pool.query("SELECT * FROM employees"); // ADD MANAGER TO JOINED TABLE
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

async function selectEmployee();
// list emp
// choose emp prompt
//return emp

async function updateEmployeeRole() {
  // emp = selectedemp()

  const { newRoleID } = await inquirer.prompt({
    type: "input",
    name: "newRoleID",
    message: "Enter new role Id.",
    validate: (input) => input.trim() !== "" || "Role ID cannot be empty",
  });
  try {
    await pool.query(`UPDATE employee SET role_title = $1 WHERE id = `, [
      newRoleID, //emp id
    ]);
    console.log(`Success! ${newRoleID} was added to employee ${id}.`);
  } catch {
    console.log("Error updating role");
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

async function addRole() {}

async function viewAllDepartments() {
  try {
    const departmentData = await pool.query("SELECT * FROM department");
    console.table(departmentData.rows);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addDepartments() {}
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

// inquirer
//   .prompt([
// {
//   type: "list",
//   name: "employees",
//   message: "View All Employees",
//   choices: [
//     "John Doe",
//     "Mike Chan",
//     "Ashley Rodriguez",
//     "Kevin Tupik",
//     "Kunal Singh",
//     "Malia Brown",
//     "Sarah Lourd",
//     "Tom Allen",
//   ],
// },
// {
//   type: "input",
//   message: "Add Employee",
//   name: "add employee",
// },
// {
//   type: "input",
//   message: "Update Employee",
//   name: "update employee",
