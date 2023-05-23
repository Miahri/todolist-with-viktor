import React, {memo, useCallback} from 'react';
import {FilterType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC} from "./state/tasks-reducer";
import {FilterButton} from "./FilterButton";
import {Task} from "./Task";

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

export const TodolistWithRedux = memo((props: TodolistPropsType) => {
    console.log("Todolist");

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
    let dispatch = useDispatch();

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch]);

    const changeFilterAll = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'all'))
    }, [dispatch]);

    const changeFilterActive = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'active'))
    }, [dispatch]);

    const changeFilterCompleted = useCallback(() => {
        dispatch(changeFilterAC(props.id, 'completed'))
    }, [dispatch]);

    const onChangeTLTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, props.id));
    }, [dispatch]);

    const deleteTodoList = useCallback(() => dispatch(removeTodolistAC(props.id)), [dispatch]);

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
                        return (
                            <Task key={t.id}
                                  task={t}
                                  todolistId={props.id}/>
                        )
                    })}
                </ul>
            </div>
            <div>
                <FilterButton name={'All'}
                              variant={props.filter === 'all' ? "contained" : 'text'}
                              color={'inherit'}
                              changeFilter={changeFilterAll} />
                <FilterButton name={'Active'}
                              variant={props.filter === 'active' ? "contained" : 'text'}
                              color={'primary'}
                              changeFilter={changeFilterActive} />
                <FilterButton name={'Completed'}
                              variant={props.filter === 'completed' ? "contained" : 'text'}
                              color={'secondary'}
                              changeFilter={changeFilterCompleted} />
            </div>
        </div>
    )
})