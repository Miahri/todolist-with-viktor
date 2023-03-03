import {TaskType} from "../Todolist";
import {v1} from "uuid";

type MainType = RemoveTaskACType | AddTaskACType | ChangeStatusACType

export const taskReducer = (state: TaskType[], action: MainType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter((t: TaskType) => t.id !== action.payload.id);
        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return [...state, newTask];
        case 'CHANGE-STATUS':
            return state.map((t:TaskType) => t.id === action.payload.id ? {...t, isDone: action.payload.status} : t);
        default:
            return state
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
}

export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title
        }
    } as const
}

export const changeStatusAC = (id: string, status: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id: id,
            status: status
        }
    } as const
}