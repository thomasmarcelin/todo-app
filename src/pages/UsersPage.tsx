import React from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { User } from "../types/User";
import "./UsersPage.css";

export default function UsersPage() {
    const [users] = useLocalStorage("users");
    const [loggedIn] = useLocalStorage('loggedIn');
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loggedIn) {
            navigate('/user/'+loggedIn);
        }
    }, [loggedIn, navigate]);

    return (
      <div className="centerFlex">
        <h1 className="textCenter">Available users</h1>
        <h5 className="textCenter">Pick yours 😊</h5>
        {users && users.map((user: User) => <UserCard key={user.login} user={user} />)}
      </div>
    );
  }