import { ResolutionEnum } from "./Resolution.enum";

export interface Todo {
    id: string;
    name: string;
    solved: ResolutionEnum;
}