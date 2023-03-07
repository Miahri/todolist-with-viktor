import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, status: boolean, todolistId: string) => void
    onChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    onChangeTLTitle: (title: string, todolistId: string) => void
    deleteTodoList: (todolistId: string) => void
    filter: FilterType
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => props.addTask(title, props.id);
    const changeFilter = (filter: FilterType) => props.changeFilter(filter, props.id);
    const onChangeTLTitle = (title: string) => props.onChangeTLTitle(title, props.id);
    const deleteTodoList = () => props.deleteTodoList(props.id);

    let tasksForTodolist;
    if (props.tasks.length === 0) {
        tasksForTodolist = <span>Your list is empty!</span>
    } else {
        tasksForTodolist = props.tasks.map((t: TaskType) => {
            const removeTask = () => props.removeTask(t.id, props.id);
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onChangeTaskTitle = (title: string) => {
                props.onChangeTaskTitle(t.id, title, props.id)
            }

            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeStatus}
                           className={t.isDone ? 'is-done' : ''}/>
                    <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTLTitle}/></h3>
            <button onClick={deleteTodoList}>Delete</button>
            <AddItemForm addItem={addTask} />
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