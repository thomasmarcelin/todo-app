import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function UserCard({ user }: { user: User }) {
    const navigate = useNavigate();
    const [password, setPassword] = React.useState('');
    const [, setLoggedIn] = useLocalStorage('loggedIn');

    const setPasswordFromControl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const login = (password: string) => {
        if(user.password === password) {
            setLoggedIn(user.login);
            navigate('/user/' + user.login);
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://i.pravatar.cc/300" />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', marginBottom: 15 }}>{user.displayName}</Card.Title>
                <Card.Text>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" onChange={setPasswordFromControl}/>
                </FloatingLabel>
                </Card.Text>
                <div style= {{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <Button variant="primary" onClick={() => login(password)}>Login</Button>
                </div>
            </Card.Body>
        </Card>
    );
  }