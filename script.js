// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

let employeesArray = [];

const collectEmployees = function () {
  let addMoreEmployees = true;
  while (addMoreEmployees) {
    let employeeFirstName = prompt("Enter Employee First Name");
    let employeeLastName = prompt("Enter Employee Last Name");
    let employeeSalary = prompt("Enter Employee Salary");
    if (isNaN(employeeSalary)) {
      employeeSalary = 0;
    } else {
      Number(employeeSalary);
    }
    console.log(typeof Number(employeeSalary));
    let formattedSalary = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    let newEmployee = [
      {
        lastName: `${employeeLastName}`,
        firstName: `${employeeFirstName}`,
        salary: `${formattedSalary.format(employeeSalary)}`,
        salaryRaw: `${employeeSalary}`,
      },
    ];
    employeesArray = employeesArray.concat(newEmployee);
    addMoreEmployees = confirm("Add another employee?");
  }
  return employeesArray;
};

// Display the average salary
let salaryArray = [];
let sum = 0;
const displayAverageSalary = function (employeesArray) {
  for (let i = 0; i < employeesArray.length; i++) {
    salaryArray = salaryArray.concat(employeesArray[i].salaryRaw);
  }
  const calcAve = function () {
    for (let i = 0; i < salaryArray.length; i++) {
      sum = sum + Number(salaryArray[i]);
    }
  };
  let formattedSalary = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  calcAve();
  const average = sum / salaryArray.length;
  console.log(
    `The average employee salary between our ${
      salaryArray.length
    } employee(s) is ${formattedSalary.format(average)}.`
  );
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  let randomEmployee =
    employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log(
    `Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
