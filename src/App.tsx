import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import Navbar from "./components/Navbar";
import UsersPage from "./pages/UsersPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { User } from "./types/User";
import UserPage from "./pages/UserPage";
import { ResolutionEnum } from "./types/Resolution.enum";

export default function App() {
  const [users, setUsers] = useLocalStorage("users");

  React.useEffect(() => {
    if(!users?.length) {
      const testUser: User = {
        login: "trustpair",
        password: "trustpair@test",
        displayName: "John Cena",
        todos: [{
          id: '123azed',
          name: "Finish the to-do list site",
          solved: ResolutionEnum.UNSOLVED,
        }],
      };
      setUsers([testUser]);
    }
  }, [setUsers, users?.length]);

  return (
    <div className="grid">
      <Navbar />
      <section className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserPage />} />          
        </Routes>
      </section>
    </div>
  );
}
