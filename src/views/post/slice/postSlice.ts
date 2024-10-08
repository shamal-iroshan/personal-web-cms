/* eslint-disable import/no-cycle */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AllPosts, Post, PostState } from '../types';
import { RootState } from '../../../store/types';

const initialState: PostState = {
  allPosts: {
    total: 0,
    data: [],
  },
  getAllPostIsLoading: false,
  getAllPostIsSuccess: false,
  getAllPostError: { hasError: false, description: '' },
  post: undefined,
  getPostIsLoading: false,
  getPostIsSuccess: false,
  getPostError: { hasError: false, description: '' },
  addPostIsLoading: false,
  addPostIsSuccess: false,
  addPostError: { hasError: false, description: '' },
  updatePostIsLoading: false,
  updatePostIsSuccess: false,
  updatePostError: { hasError: false, description: '' },
  deletePostIsLoading: false,
  deletePostIsSuccess: false,
  deletePostError: { hasError: false, description: '' },
};

const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    getAllPosts(state) {
      state.getAllPostIsLoading = true;
      state.getAllPostError = { hasError: false, description: '' };
    },
    getAllPostSuccess(state, action: PayloadAction<AllPosts>) {
      state.getAllPostIsLoading = false;
      state.getAllPostIsSuccess = true;
      state.allPosts = action.payload;
    },
    getAllPostError(state, action: PayloadAction<string>) {
      state.getAllPostIsLoading = false;
      state.getAllPostError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPost(state, action: PayloadAction<string>) {
      state.getPostIsLoading = true;
      state.getPostError = { hasError: true, description: '' };
    },
    getPostSuccess(state, action: PayloadAction<Post>) {
      state.getPostIsLoading = false;
      state.post = action.payload;
      state.getPostIsSuccess = true;
    },
    getPostError(state, action: PayloadAction<string>) {
      state.getPostIsLoading = false;
      state.getPostError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addPost(state, action: PayloadAction<Post>) {
      state.addPostIsLoading = true;
      state.addPostError = { hasError: true, description: '' };
    },
    addPostSuccess(state) {
      state.addPostIsLoading = false;
      state.addPostIsSuccess = true;
    },
    addPostError(state, action: PayloadAction<string>) {
      state.addPostIsLoading = false;
      state.addPostError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePost(state, action: PayloadAction<Post>) {
      state.updatePostIsLoading = true;
      state.updatePostError = { hasError: true, description: '' };
    },
    updatePostSuccess(state) {
      state.updatePostIsLoading = false;
      state.updatePostIsSuccess = true;
    },
    updatePostError(state, action: PayloadAction<string>) {
      state.updatePostIsLoading = false;
      state.updatePostError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deletePost(state, action: PayloadAction<string>) {
      state.deletePostIsLoading = true;
      state.deletePostError = { hasError: true, description: '' };
    },
    deletePostSuccess(state) {
      state.deletePostIsLoading = false;
      state.deletePostIsSuccess = true;
    },
    deletePostError(state, action: PayloadAction<string>) {
      state.deletePostIsLoading = false;
      state.deletePostError = {
        hasError: true,
        description: action.payload,
      };
    },
  },
});

// Actions
export const postActions = postSlice.actions;

// Selectors
export const selectAllPosts = (state: RootState) => state.postReducer.allPosts;
export const selectGetAllPostIsLoading = (state: RootState) =>
  state.postReducer.getAllPostIsLoading;
export const selectGetAllPostIsSuccess = (state: RootState) =>
  state.postReducer.getAllPostIsSuccess;
export const selectGetAllPostError = (state: RootState) =>
  state.postReducer.getAllPostError;
export const selectPost = (state: RootState) => state.postReducer.post;
export const selectGetPostIsLoading = (state: RootState) =>
  state.postReducer.getPostIsLoading;
export const selectGetPostIsSuccess = (state: RootState) =>
  state.postReducer.getPostIsSuccess;
export const selectGetPostError = (state: RootState) =>
  state.postReducer.getPostError;
export const selectAddPostIsLoading = (state: RootState) =>
  state.postReducer.addPostIsLoading;
export const selectAddPostIsSuccess = (state: RootState) =>
  state.postReducer.addPostIsSuccess;
export const selectAddPostError = (state: RootState) =>
  state.postReducer.addPostError;
export const selectUpdatePostIsLoading = (state: RootState) =>
  state.postReducer.updatePostIsLoading;
export const selectUpdatePostIsSuccess = (state: RootState) =>
  state.postReducer.updatePostIsSuccess;
export const selectUpdatePostError = (state: RootState) =>
  state.postReducer.updatePostError;
export const selectDeletePostIsLoading = (state: RootState) =>
  state.postReducer.deletePostIsLoading;
export const selectDeletePostIsSuccess = (state: RootState) =>
  state.postReducer.deletePostIsSuccess;
export const selectDeletePostError = (state: RootState) =>
  state.postReducer.deletePostError;

// Reducer
const postReducer = postSlice.reducer;
export default postReducer;
