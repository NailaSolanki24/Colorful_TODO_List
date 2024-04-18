#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let conditions = true;

console.log(
  chalk.magenta.bold.italic(
    "\n \t Welcome to Naila Solanki - Todo-List Application\n"
  )
);

let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green("Select An Option You Want To Do:"),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      conditions = false;
    }
  }
};
//function to add new task to the list.

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.redBright("Enter Your New Task:"),
    },
  ]);
  todoList.push(newTask.task);
  console.log(`\n ${newTask.task} task added successfully in Todo-List`);
};

//function to view all Todo-List tasks.
let viewTask = () => {
  console.log("\n Your Todo-List: \n");
  todoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};

//Function to delete a task from the list.
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.magenta(
        "Enter the 'Index No.' of the Task you Want to Delete:"
      ),
    },
  ]);
  let deletedTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(
    `\n ${deletedTask} This task has been deleted successfully from your Todo-List`
  );
};

//Function to update a task.
let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellowBright(
        "Enter the Index Of the Task you Want to Update:"
      ),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.greenBright("Now Enter New Task Name:"),
    },
  ]);
  todoList[update_task_index.index - 1] = update_task_index.new_task;
  console.log(
    `\n Task at index no. ${
      update_task_index.index - 1
    } updated successfully [For updated list check option: "View Todo-List"]`
  );
};

main();
