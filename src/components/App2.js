import React from "react";
import "../styles/App.css";
import generateID from "../helper-functions/id-generator.js";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      tasks: [
        { id: 1, text: "buy milk", isDone: false },
        { id: 2, text: "eat dinner", isDone: false },
        { id: 3, text: "nail javascript", isDone: false },
        { id: 4, text: "give feedback", isDone: false },
        { id: 5, text: "find nemo", isDone: false }
      ]
    };
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStrikethrough = this.handleStrikethrough.bind(this);
  }

  tasksPending = () => {
    const completedTasks = this.state.tasks.filter(t => {
      return t.isDone;
    });

    return this.state.tasks.length - completedTasks.length;
  };

  handleStrikethrough(event) {
    console.log("event.target.id is: ", event.target.id);
    const targetId = Number(event.target.id);

    this.setState(prevState => ({
      //synthetic event gets nullified in setState()
      tasks: prevState.tasks.map(obj =>
        obj.id === targetId
          ? Object.assign(
              obj,
              obj.isDone ? { isDone: false } : { isDone: true }
            )
          : obj
      )
    }));
  }

  handleNewInput = event => {
    this.setState({ value: event.target.value });
  };

  taskListUpdate = () => {
    this.state.tasks.push({
      id: generateID(),
      text: this.state.value,
      isDone: false
    });
    this.setState({ value: "" });
  };

  handleClick() {
    if (this.state.value === "") {
      return;
    }
    this.taskListUpdate();
  }

  handleEnterPress(event) {
    if (event.target.value === "") {
      return;
    }
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.taskListUpdate();
    }
  }

  render() {
    const TaskList = this.state.tasks.map(task => {
      return (
        <Item
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={this.handleStrikethrough}
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
          <p className="info">Tasks pending: {this.tasksPending()}</p>
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

function Item({ description, onClick, className, id }) {
  return (
    <li id={id} className={className} onClick={onClick}>
      {description}
    </li>
  );
}

function App() {
  return <ToDoList />;
}

export default App;
