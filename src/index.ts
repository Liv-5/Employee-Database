import inquirer from "inquirer";
import pg from "pg";

console.table(role);

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
// },
// {
//   type: "list",
//   message: "What is your preferred method of communication?",
//   name: "contact",
//   choices: ["email", "phone", "telekinesis"],
// },

// ])
// .then((data) => {
//   const filename = `${data.name.toLowerCase().split(" ").join("")}.json`;

//   fs.writeFile(filename, JSON.stringify(data, null, "\t"), (err) =>
//     err ? console.log(err) : console.log("Success!")
//   );
// });
