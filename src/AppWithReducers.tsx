import React, {Reducer, useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistReducer,
    TodolistsMainType
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksMainType,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type AllTasksType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodolist] = useReducer<Reducer<Array<TodolistType>, TodolistsMainType>>(todolistReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, dispatchToTasks] = useReducer<Reducer<AllTasksType, TasksMainType>>(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ]
    })

    /*let [tasks, tasksDispatch] = useReducer(taskReducer, [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])*/

    /*let [filter, setFilter] = useState<FilterType>('all')*/

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(title, todolistId));
        //setTasks({[todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]], ...tasks});
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(id, todolistId));
        //setTasks({[todolistId]: tasks[todolistId].filter((t: TaskType) => t.id !== id), ...tasks});
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        dispatchToTodolist(changeFilterAC(todolistId, filter));
        //setTodolist(todoLists.map((tl: TodolistType) => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const changeStatus = (id: string, status: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId))
        /*setTasks({[todolistId]: tasks[todolistId].map((t: TaskType) => t.id === id ? {...t, isDone: status} : t)
            , ...tasks});*/
    }

    const onChangeTaskTitle = (id: string, title: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(id, title, todolistId));
        //setTasks({[todolistId]: tasks[todolistId].map((t: TaskType) => t.id === id ? {...t, title} : t), ...tasks});
    }

    const onChangeTLTitle = (title: string, todoListId: string) => {
        dispatchToTodolist(changeTodolistTitleAC(todoListId, title));
        //setTodolist(todoLists.map((tl:TodolistType) => tl.id === todoListId ? {...tl, title: title} : tl))
    }

    const addTodoList = (title: string) => {
        /*let newTList: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        };
        setTodolist([newTList, ...todoLists]);
        setTasks({[newTList.id]: [], ...tasks});*/
        dispatchToTodolist(addTodolistAC(title));
        dispatchToTasks(addTodolistAC(title));
    }

    const deleteTodoList = (todoListId: string) => {
        /*setTodolist(todoLists.filter((tl: TodolistType) => todoListId !== tl.id));

        delete tasks[todoListId];
        setTasks({...tasks})*/
        dispatchToTodolist(removeTodolistAC(todoListId));
        dispatchToTasks(removeTodolistAC(todoListId));
    }

    return (
        <div className="App">
            <div>
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div>
                {todoLists.map((tl: TodolistType) => {
                    let filteredTasks = tasks[tl.id];

                    if(tl.filter === 'active') {
                        filteredTasks = filteredTasks.filter((t: TaskType) => !t.isDone)
                    }
                    if(tl.filter === 'completed') {
                        filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone)
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={filteredTasks}
                                     addTask={addTask}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     changeStatus={changeStatus}
                                     onChangeTaskTitle={onChangeTaskTitle}
                                     onChangeTLTitle={onChangeTLTitle}
                                     deleteTodoList={deleteTodoList}
                                     filter={tl.filter}/>
                })}
            </div>
        </div>
    );
}

export default AppWithReducers;
