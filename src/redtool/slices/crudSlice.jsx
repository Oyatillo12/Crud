import { createSlice } from "@reduxjs/toolkit";


export const crudSlice = createSlice({
    initialState: {
        todos:[]
    },
    name: "crud",
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const updatedTodo = state.todos.find(todo => todo.id === action.payload.id);
            if(updatedTodo) {
                updatedTodo.title = action.payload.title
                updatedTodo.email = action.payload.email
                updatedTodo.tel = action.payload.tel
            }
        }
    }
})

export const {addTodo, deleteTodo,updateTodo} = crudSlice.actions

export default crudSlice.reducer;