import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string;
    name: string;
    email: string;
}


interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
}

const userSlice = createSlice ({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter( user => user.id !== action.payload )
        },
        updateUser(state, action: PayloadAction<User>) {
            const index = state.users.findIndex (user => user.id === action.payload.id);
            if ( index !== -1) {
                state.users[index] = action.payload;
            }
        }
    }
})


export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;