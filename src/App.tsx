import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([...tasks, newTask]);
    }

    const removeTask = (id: string) => {
        let result = tasks.filter((t: TaskType) => t.id !== id);
        setTasks(result);
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter);
    }

    const changeStatus = (id: string, status: boolean) => {
        setTasks(tasks.map((t:TaskType) => t.id === id ? {...t, isDone: status} : t));
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
