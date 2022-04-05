import React, { Component } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import "../style/Main.css";
export default class Main extends Component {
  constructor(props) {
    super(props);
    let allTasks = localStorage.getItem("tasks");
    if (allTasks === null) {
      allTasks = [];
    } else {
      allTasks = JSON.parse(allTasks);
    }

    this.state = { tasks: allTasks };
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }
  createTask(task) {
    if (task.trim() === "") {
      alert("Empty task cannot be added!");
      return;
    }
    let newTask = { taskName: task.trim(), isCompleted: false };
    let allTask = [...this.state.tasks, newTask];
    this.setState({ tasks: allTask }, () => {
      console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  }
  deleteTask(idx) {
    let arr = this.state.tasks.filter((t, index) => index !== idx);
    this.setState({ tasks: arr }, () => {
      console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  }
  editTask(index, value) {
    let arr = [...this.state.tasks];
    arr[index].taskName = value;
    this.setState({ tasks: arr }, () => {
      console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  }
  toggleTask(index) {
    let arr = [...this.state.tasks];
    arr[index].isCompleted = !arr[index].isCompleted;
    this.setState({ tasks: arr }, () => {
      console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    });
  }
  render() {
    return (
      <div className="Main">
        <h1>Todo List</h1>
        <div className="content">
          <CreateTask createTask={this.createTask} />
          <br />
          <TaskList
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            toggleTask={this.toggleTask}
          />
        </div>
      </div>
    );
  }
}
