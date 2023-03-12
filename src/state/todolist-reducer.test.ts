import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todoListId1: string
let todoListId2: string

let startState: Array<TodolistType>;

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ];
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test('correct todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC('Where to travel'));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('Where to travel');
})

test('correct todolist filter should be changed', () => {
    const endState = todolistReducer(startState, changeFilterAC(todoListId1, 'active'));

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('active');
})

test('correct todolist title should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistTitleAC(todoListId2, 'Where to go'));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe('Where to go');
})

