import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, status: boolean) => void
    filter: FilterType
}

export const Todolist = (props: TodolistPropsType) => {
    const [inputValue, setValue] = useState('');
    const [error, setError] = useState<null | string>(null);

    const addTask = () => {
        if (inputValue.trim() === '') {
            setError('Title is required')
        } else {
            props.addTask(inputValue.trim());
            setValue('');
        }
    };
    const inputValueChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (inputValue.trim() === '') {
                setError('Title is required');
            } else {
                props.addTask(inputValue.trim());
                setValue('');
            }
        }
    }
    const changeFilter = (filter: FilterType) => props.changeFilter(filter)
    let tasksForTodolist;
    if (props.tasks.length === 0) {
        tasksForTodolist = <span>Your list is empty!</span>
    } else {
        tasksForTodolist = props.tasks.map((t: TaskType) => {
            const removeTask = () => props.removeTask(t.id);
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked)
            }

            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeStatus}
                           className={t.isDone ? 'is-done' : ''}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={inputValueChange}
                       onKeyPress={keyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>error</div>}
            </div>
            <div>
                <ul>{tasksForTodolist}</ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilter('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilter('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}