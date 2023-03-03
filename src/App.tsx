import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Todolist";
import {addTaskAC, changeStatusAC, removeTaskAC, taskReducer} from "./reducers/TaskReducers";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, tasksDispatch] = useReducer(taskReducer, [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        tasksDispatch(addTaskAC(title));
    }

    const removeTask = (id: string) => {
        tasksDispatch(removeTaskAC(id));
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter);
    }

    const changeStatus = (id: string, status: boolean) => {
        tasksDispatch(changeStatusAC(id, status));
    }

    let filteredTasks = tasks;
    if(filter === 'active') {
        filteredTasks = filteredTasks.filter((t: TaskType) => !t.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;
