import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FilterType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
}

export const TodolistWithRedux = (props: TodolistPropsType) => {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
    let dispatch = useDispatch();

    const addTask = (title: string) => dispatch(addTaskAC(title, props.id));
    const changeFilter = (filter: FilterType) => dispatch(changeFilterAC(props.id, filter));
    const onChangeTLTitle = (title: string) => dispatch(changeTodolistTitleAC(title, props.id));
    const deleteTodoList = () => dispatch(removeTodolistAC(props.id));

    let tasksForTodolist = tasks;
    if(props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t: TaskType) => !t.isDone)
    }
    if(props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t: TaskType) => t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTLTitle}/></h3>
            <button onClick={deleteTodoList}>Delete</button>
            <AddItemForm addItem={addTask} />
            <div>
                <ul>
                    {tasksForTodolist.map((t: TaskType) => {
                        const removeTask = () => dispatch(removeTaskAC(t.id, props.id));
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                        }
                        const onChangeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC(t.id, title, props.id))
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
                    })}
                </ul>
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