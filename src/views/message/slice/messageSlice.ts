/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageState, AllMessages, Message } from '../types';
import { RootState } from '../../../store/types';

const initialState: MessageState = {
  allMessages: {
    total: 0,
    data: [],
  },
  getAllMessageIsLoading: false,
  getAllMessageIsSuccess: false,
  getAllMessageError: { hasError: false, description: '' },
  message: undefined,
  getMessageIsLoading: false,
  getMessageIsSuccess: false,
  getMessageError: { hasError: false, description: '' },
  updateMessageIsLoading: false,
  updateMessageIsSuccess: false,
  updateMessageError: { hasError: false, description: '' },
  deleteMessageIsLoading: false,
  deleteMessageIsSuccess: false,
  deleteMessageError: { hasError: false, description: '' },
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getAllMessages(state) {
      state.getAllMessageIsLoading = true;
      state.getAllMessageError = { hasError: false, description: '' };
    },
    getAllMessageSuccess(state, action: PayloadAction<AllMessages>) {
      state.getAllMessageIsLoading = false;
      state.getAllMessageIsSuccess = true;
      state.allMessages = action.payload;
    },
    getAllMessageError(state, action: PayloadAction<string>) {
      state.getAllMessageIsLoading = false;
      state.getAllMessageError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMessage(state, action: PayloadAction<string>) {
      state.getMessageIsLoading = true;
      state.getMessageError = { hasError: true, description: '' };
    },
    getMessageSuccess(state, action: PayloadAction<Message>) {
      state.getMessageIsLoading = false;
      state.message = action.payload;
      state.getMessageIsSuccess = true;
    },
    getMessageError(state, action: PayloadAction<string>) {
      state.getMessageIsLoading = false;
      state.getMessageError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMessage(state, action: PayloadAction<Message>) {
      state.updateMessageIsLoading = true;
      state.updateMessageError = { hasError: true, description: '' };
    },
    updateMessageSuccess(state) {
      state.updateMessageIsLoading = false;
      state.updateMessageIsSuccess = true;
    },
    updateMessageError(state, action: PayloadAction<string>) {
      state.updateMessageIsLoading = false;
      state.updateMessageError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMessage(state, action: PayloadAction<string>) {
      state.deleteMessageIsLoading = true;
      state.deleteMessageError = { hasError: true, description: '' };
    },
    deleteMessageSuccess(state) {
      state.deleteMessageIsLoading = false;
      state.deleteMessageIsSuccess = true;
    },
    deleteMessageError(state, action: PayloadAction<string>) {
      state.deleteMessageIsLoading = false;
      state.deleteMessageError = {
        hasError: true,
        description: action.payload,
      };
    },
  },
});

// Actions
export const messageActions = messageSlice.actions;

// Selectors
export const selectAllMessages = (state: RootState) =>
  state.messageReducer.allMessages;
export const selectAllMessagesIsLoading = (state: RootState) =>
  state.messageReducer.getAllMessageIsLoading;
export const selectAllMessagesIsSuccess = (state: RootState) =>
  state.messageReducer.getAllMessageIsSuccess;
export const selectAllMessagesError = (state: RootState) =>
  state.messageReducer.getAllMessageError;
export const selectMessage = (state: RootState) => state.messageReducer.message;
export const selectMessageIsLoading = (state: RootState) =>
  state.messageReducer.getMessageIsLoading;
export const selectMessageIsSuccess = (state: RootState) =>
  state.messageReducer.getMessageIsSuccess;
export const selectMessageError = (state: RootState) =>
  state.messageReducer.getMessageError;
export const selectMessageUpdateIsLoading = (state: RootState) =>
  state.messageReducer.updateMessageIsLoading;
export const selectMessageUpdateIsSuccess = (state: RootState) =>
  state.messageReducer.updateMessageIsSuccess;
export const selectMessageUpdateError = (state: RootState) =>
  state.messageReducer.updateMessageError;
export const selectMessageDeleteIsLoading = (state: RootState) =>
  state.messageReducer.deleteMessageIsLoading;
export const selectMessageDeleteIsSuccess = (state: RootState) =>
  state.messageReducer.deleteMessageIsSuccess;
export const selectMessageDeleteError = (state: RootState) =>
  state.messageReducer.deleteMessageError;

// Reducer
const messageReducer = messageSlice.reducer;
export default messageReducer;
