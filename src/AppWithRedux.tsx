import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
} from "./state/todolist-reducer";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    let dispatch = useDispatch();

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title));
    }

    return (
        <div className="App">
            <div>
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div>
                {todoLists.map((tl: TodolistType) => {
                    return <TodolistWithRedux key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     filter={tl.filter}/>
                })}
            </div>
        </div>
    );
}

export default AppWithRedux;
