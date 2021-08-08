import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const Form = (props) => {
  const { onAddTodo, onUpdateTodo, initialInputValue } = props; // Destructuring props

  const [inputValue, setInputValue] = useState("");

  // Change when initivalInputValue is available or changing
  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  return (
    <div style={{ width: "300px", margin: "0 auto 24px 0" }}>
      <div>
        <input
          name="todo"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        {!!initialInputValue ? (
          <button type="submit" onClick={() => onUpdateTodo(inputValue)}>
            Update Todo
          </button>
        ) : (
          <button type="submit" onClick={() => onAddTodo(inputValue)}>
            Add Todo
          </button>
        )}
      </div>
    </div>
  );
};

const TodoItem = (props) => {
  const { label, completed, onDelete, onSelectTodo } = props;

  return (
    <div
      style={{
        border: "1px solid #f3f3f3",
        padding: "12px 24px",
        marginBottom: 12,
      }}
      onClick={(e) => {
        props.onChangeStatus({
          label,
          completed,
        });
      }}
    >
      <h4 style={{ marginBottom: "0px", lineHeight: 0 }}>{label}</h4>
      <p>{completed === true ? "Sudah Selesai" : "Belum Selesai"}</p>
      <button
        onClick={(e) => {
          // Prevent call the outer onClick function (on div)
          e.stopPropagation();
          onDelete({ label: label, completed: completed });
        }}
      >
        Delete Todo
      </button>
      <button
        onClick={(e) => {
          // Prevent call the outer onClick function (on div)
          e.stopPropagation();
          onSelectTodo({
            label: label,
            completed: completed,
          });
        }}
      >
        Update Todo
      </button>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    {
      label: "Beli buku",
      completed: false,
    },
    {
      label: "Beli sate",
      completed: true,
    },
    {
      label: "Beli tuna",
      completed: true,
    },
  ]);

  const [selectedTodo, setSelectedTodo] = useState({});

  const completeTodo = (todo) => {
    const tempTodos = [...todos];
    const todoIndex = tempTodos.findIndex((item) => item.label === todo.label);

    const updatedTodo = {
      ...todo,
      completed: todo.completed ? false : true,
    };
    tempTodos[todoIndex] = updatedTodo;

    setTodos(tempTodos);
  };

  const addTodo = (label) => {
    const todo = {
      label,
      completed: false,
    };

    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const deleteTodo = (todo) => {
    const tempTodos = [...todos];
    const todoIndex = tempTodos.findIndex((item) => item.label === todo.label);

    tempTodos.splice(todoIndex, 1);

    setTodos(tempTodos);
  };

  const updateTodo = (value) => {
    const tempTodos = [...todos];
    const todoIndex = tempTodos.findIndex(
      (item, index) => index === selectedTodo.index
    );

    const updatedTodo = {
      ...tempTodos[todoIndex],
      label: value,
    };

    tempTodos[todoIndex] = updatedTodo;
    setTodos(tempTodos);
    setSelectedTodo({});
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h1>Todo List</h1>

      <div>
        <Form
          initialInputValue={selectedTodo.label || ""}
          onAddTodo={(value) => addTodo(value)}
          onUpdateTodo={(value) => updateTodo(value)}
        />
      </div>

      {todos.map((todo, index) => {
        return (
          <TodoItem
            label={todo.label}
            completed={todo.completed}
            onChangeStatus={(item) => completeTodo(item)}
            onDelete={(item) => deleteTodo(item)}
            onSelectTodo={(item) => setSelectedTodo({ ...item, index })}
          />
        );
      })}
    </div>
  );
};

export default App;
