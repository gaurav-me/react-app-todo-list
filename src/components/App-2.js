import React from "react";
import "../styles/App.css";
import generateID from "../helper-functions/id-generator.js";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      tasks: [
        { id: generateID(), text: "buy milk", isDone: false },
        { id: generateID(), text: "eat dinner", isDone: false },
        { id: generateID(), text: "nail javascript", isDone: false },
        { id: generateID(), text: "give feedback", isDone: false },
        { id: generateID(), text: "find nemo", isDone: false }
      ]
    };
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStrikethrough = this.handleStrikethrough.bind(this);
  }

  handleStrikethrough() {}

  handleNewInput = event => {
    this.setState({ value: event.target.value });
  };

  handleClick() {
    let targetValue = this.state.value;
    if (targetValue === "") {
      return;
    }
    this.setState({
      value: targetValue,
      tasksPending: this.state.tasksPending + 1
    });
    this.tasks.push(this.state.value);
    this.setState({ value: "" });
    console.log(targetValue);
  }

  handleEnterPress(event) {
    if (event.target.value === "") {
      return;
    }
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.setState({
        value: event.target.value,
        tasksPending: this.state.tasksPending + 1
      });
      console.log(this.state.value);
      this.tasks.push(this.state.value);
      this.setState({ value: "" });
      event.target.value = "";
    }

    if (event.key !== "Enter") {
      return;
    }

    if (this.state.input === "") {
      return;
    }

    const newTask = { id: generateID(), text: this.state.input, isDone: false };
  }

  render() {
    const TaskList = this.tasks.map(task => {
      return (
        <Item
          key={task.id}
          description={task.text}
          onClick={this.handleStrikethrough()}
          className={task.isDone ? "done" : "toDo"}
        />
      );
    });

    return (
      <div id="container">
        <div className="form">
          <Input
            type="text"
            value={this.state.value}
            onKeyDown={this.handleEnterPress}
            placeholder="Enter task here..."
            onChange={this.handleNewInput}
          />
          <Button type="Button" onClick={this.handleClick} />
        </div>
        <div>
          <p className="info">Tasks pending: {this.state.tasksPending}</p>
        </div>
        <ul>{TaskList}</ul>
      </div>
    );
  }
}

function Input({ type, value, onKeyDown, placeholder, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function Button({ type, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      Add Task
    </button>
  );
}

function Item({ description, onClick, className }) {
  return (
    <li className={className} onClick={onClick}>
      {description}
    </li>
  );
}

function App2() {
  return <ToDoList />;
}

export default App2;
