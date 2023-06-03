import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
});

const initialGlobalState = {
    todolists: [
        {id: "todoListId1", title: 'What to learn', filter: 'all'},
        {id: "todoListId2", title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        ["todoListId2"]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}