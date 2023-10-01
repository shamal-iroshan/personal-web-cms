/* eslint-disable import/no-cycle */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AllPortfolios, Portfolio, PortfolioState } from '../types';
import { RootState } from '../../../store/types';

const initialState: PortfolioState = {
  allPortfolios: {
    total: 0,
    data: [],
  },
  getAllPortfolioIsLoading: false,
  getAllPortfolioIsSuccess: false,
  getAllPortfolioError: { hasError: false, description: '' },
  portfolio: undefined,
  getPortfolioIsLoading: false,
  getPortfolioIsSuccess: false,
  getPortfolioError: { hasError: false, description: '' },
  addPortfolioIsLoading: false,
  addPortfolioIsSuccess: false,
  addPortfolioError: { hasError: false, description: '' },
  updatePortfolioIsLoading: false,
  updatePortfolioIsSuccess: false,
  updatePortfolioError: { hasError: false, description: '' },
  deletePortfolioIsLoading: false,
  deletePortfolioIsSuccess: false,
  deletePortfolioError: { hasError: false, description: '' },
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    getAllPortfolios(state) {
      state.getAllPortfolioIsLoading = true;
      state.getAllPortfolioError = { hasError: false, description: '' };
    },
    getAllPortfolioSuccess(state, action: PayloadAction<AllPortfolios>) {
      state.getAllPortfolioIsLoading = false;
      state.getAllPortfolioIsSuccess = true;
      state.allPortfolios = action.payload;
    },
    getAllPortfolioError(state, action: PayloadAction<string>) {
      state.getAllPortfolioIsLoading = false;
      state.getAllPortfolioError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPortfolio(state, action: PayloadAction<string>) {
      state.getPortfolioIsLoading = true;
      state.getPortfolioError = { hasError: true, description: '' };
    },
    getPortfolioSuccess(state, action: PayloadAction<Portfolio>) {
      state.getPortfolioIsLoading = false;
      state.portfolio = action.payload;
      state.getPortfolioIsSuccess = true;
    },
    getPortfolioError(state, action: PayloadAction<string>) {
      state.getPortfolioIsLoading = false;
      state.getPortfolioError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addPortfolio(state, action: PayloadAction<Portfolio>) {
      state.addPortfolioIsLoading = true;
      state.addPortfolioError = { hasError: true, description: '' };
    },
    addPortfolioSuccess(state) {
      state.addPortfolioIsLoading = false;
      state.addPortfolioIsSuccess = true;
    },
    addPortfolioError(state, action: PayloadAction<string>) {
      state.addPortfolioIsLoading = false;
      state.addPortfolioError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePortfolio(state, action: PayloadAction<Portfolio>) {
      state.updatePortfolioIsLoading = true;
      state.updatePortfolioError = { hasError: true, description: '' };
    },
    updatePortfolioSuccess(state) {
      state.updatePortfolioIsLoading = false;
      state.updatePortfolioIsSuccess = true;
    },
    updatePortfolioError(state, action: PayloadAction<string>) {
      state.updatePortfolioIsLoading = false;
      state.updatePortfolioError = {
        hasError: true,
        description: action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deletePortfolio(state, action: PayloadAction<string>) {
      state.deletePortfolioIsLoading = true;
      state.deletePortfolioError = { hasError: true, description: '' };
    },
    deletePortfolioSuccess(state) {
      state.deletePortfolioIsLoading = false;
      state.deletePortfolioIsSuccess = true;
    },
    deletePortfolioError(state, action: PayloadAction<string>) {
      state.deletePortfolioIsLoading = false;
      state.deletePortfolioError = {
        hasError: true,
        description: action.payload,
      };
    },
  },
});

// Actions
export const portfolioActions = portfolioSlice.actions;

// Selectors
export const selectAllPortfolios = (state: RootState) =>
  state.portfolioReducer.allPortfolios;
export const selectGetAllPortfolioIsLoading = (state: RootState) =>
  state.portfolioReducer.getAllPortfolioIsLoading;
export const selectGetAllPortfolioIsSuccess = (state: RootState) =>
  state.portfolioReducer.getAllPortfolioIsSuccess;
export const selectGetAllPortfolioError = (state: RootState) =>
  state.portfolioReducer.getAllPortfolioError;
export const selectPortfolio = (state: RootState) =>
  state.portfolioReducer.portfolio;
export const selectGetPortfolioIsLoading = (state: RootState) =>
  state.portfolioReducer.getPortfolioIsLoading;
export const selectGetPortfolioIsSuccess = (state: RootState) =>
  state.portfolioReducer.getPortfolioIsSuccess;
export const selectGetPortfolioError = (state: RootState) =>
  state.portfolioReducer.getPortfolioError;
export const selectAddPortfolioIsLoading = (state: RootState) =>
  state.portfolioReducer.addPortfolioIsLoading;
export const selectAddPortfolioIsSuccess = (state: RootState) =>
  state.portfolioReducer.addPortfolioIsSuccess;
export const selectAddPortfolioError = (state: RootState) =>
  state.portfolioReducer.addPortfolioError;
export const selectUpdatePortfolioIsLoading = (state: RootState) =>
  state.portfolioReducer.updatePortfolioIsLoading;
export const selectUpdatePortfolioIsSuccess = (state: RootState) =>
  state.portfolioReducer.updatePortfolioIsSuccess;
export const selectUpdatePortfolioError = (state: RootState) =>
  state.portfolioReducer.updatePortfolioError;
export const selectDeletePortfolioIsLoading = (state: RootState) =>
  state.portfolioReducer.deletePortfolioIsLoading;
export const selectDeletePortfolioIsSuccess = (state: RootState) =>
  state.portfolioReducer.deletePortfolioIsSuccess;
export const selectDeletePortfolioError = (state: RootState) =>
  state.portfolioReducer.deletePortfolioError;

// Reducer
const portfolioReducer = portfolioSlice.reducer;
export default portfolioReducer;
