import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: [],
        isLoading: false,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { addMessage, setIsLoading } = messagesSlice.actions;
export default messagesSlice.reducer;