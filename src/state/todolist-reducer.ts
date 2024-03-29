import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    id: string
    filter: FilterType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type TodolistsMainType = RemoveTodolistActionType | AddTodolistActionType | ChangeFilterActionType | ChangeTodolistTitleActionType;

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: Array<TodolistType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
];

export const todolistReducer = (state = initialState, action: TodolistsMainType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl: TodolistType) => action.id !== tl.id);
        case 'ADD-TODOLIST':
            let newTList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            };
            return [newTList, ...state]
        case 'CHANGE-FILTER':
            return state.map((tl:TodolistType) => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl:TodolistType) => tl.id === action.id ? {...tl, title: action.title} : tl);
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeFilterAC = (id: string, filter: FilterType): ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER', id: id, filter: filter}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}