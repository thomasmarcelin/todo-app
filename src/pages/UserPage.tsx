import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./UserPage.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { User } from "../types/User";
import { useNavigate, useParams } from "react-router-dom";
import { ResolutionEnum } from "../types/Resolution.enum";
import { Todo } from "../types/Todo";
import { Trash3 } from 'react-bootstrap-icons';

export default function UserPage() {
  const [users, setUsers] = useLocalStorage("users");
  const [loggedIn] = useLocalStorage("loggedIn");
  const [newTask, setNewTask] = React.useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const setTaskSolved = (todoId: string) => {
    const updatedUsers = users.map((user: User) => {
        if(user.login === id) {
            const indexToChange = user.todos.findIndex(todo => todo.id === todoId);
            if(indexToChange !== -1) {
                user.todos[indexToChange].solved = user.todos[indexToChange].solved === ResolutionEnum.UNSOLVED ? ResolutionEnum.SOLVED : ResolutionEnum.UNSOLVED;
            }
        }
        return user;
    });
    setUsers(updatedUsers);
  }

  const setNewTaskValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }

  const addTask = (newTask: string) => {
    if(!newTask || newTask === '') {
        return;
    }

    const updatedUsers = users.map((user: User) => {
        if(user.login === id) {
             user.todos.push({
                id: Math.floor(Math.random() * 100000).toString(),
                name: newTask,
                solved: ResolutionEnum.UNSOLVED
             });
        }
        return user;
    });
    setUsers(updatedUsers);
    setNewTask('');
  }

  const removeTask = (todoId: string) => {
    const updatedUsers = users.map((user: User) => {
        if(user.login === id) {
            const indexToChange = user.todos.findIndex(todo => todo.id === todoId);
            if(indexToChange !== -1) {
                user.todos.splice(indexToChange, 1);
            }
        }
        return user;
    });
    setUsers(updatedUsers);
  }

  useEffect(() => {
    if (loggedIn !== id) {
      navigate("/");
    }
  }, [id, loggedIn, navigate]);

  return (
    <div className="centerFlex">
      <h1 className="textCenter" style={{ marginBottom: 30 }}>
        Here's your to-do list. Don't slack 😇
      </h1>
      <Form
        style={{
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "flex-start",
          minWidth: 400,
          flexDirection: 'column'
        }}
        onSubmit={event => {event.preventDefault()}}
      >
        
          <InputGroup className="mb-3" style={{justifyContent: 'center'}}>
            <FormControl
                placeholder="New task ..."
                aria-label="New task ..."
                aria-describedby="basic-addon2"
                onChange={setNewTaskValue}
                value={newTask}
                className="inputWidth"
                />
            <Button variant="outline-primary" id="button-addon2" type="submit" onClick={() => addTask(newTask)}>
                Add
            </Button>
        </InputGroup>
        {users
          ?.find((user: User) => user.login === id)
          ?.todos.map((todo: Todo) => (
            <div key={todo.id} className="mb-3" >
              <Form.Check type="checkbox" id={`todo-${todo.id}`}>
                <Form.Check.Input type="checkbox" checked={todo.solved === ResolutionEnum.SOLVED} onChange={() => setTaskSolved(todo.id)}/>
                <Form.Check.Label className={todo.solved === ResolutionEnum.SOLVED ? 'offset striked': 'offset'}>{todo.name} </Form.Check.Label><Trash3 color="red" onClick={() => removeTask(todo.id)}/>
              </Form.Check>
            </div>
          ))}
      </Form>
    </div>
  );
}
