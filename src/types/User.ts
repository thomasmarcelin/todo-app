import { Todo } from "./Todo";

export interface User {
    login: string;
    password: string;
    displayName: string;
    todos: Todo[];
}