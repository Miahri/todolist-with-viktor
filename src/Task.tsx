import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {TaskType} from "./TodolistWithRedux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }, [dispatch]);

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    }, [dispatch]);

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todolistId))
    }, [dispatch]);

    return (
        <li key={props.task.id}>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={changeStatus}
                   className={props.task.isDone ? 'is-done' : ''}/>
            <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}/>
            <button onClick={removeTask}>x</button>
        </li>
    )
});