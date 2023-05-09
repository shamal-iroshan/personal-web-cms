import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllConfigs, Config, ConfigState } from '../types';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../store/types';

const initialState: ConfigState = {
  allConfigs: {
    total: 0,
    data: [],
  },
  getAllConfigIsLoading: false,
  getAllConfigIsSuccess: false,
  getAllConfigError: { hasError: false, description: '' },
  config: undefined,
  getConfigIsLoading: false,
  getConfigIsSuccess: false,
  getConfigError: { hasError: false, description: '' },
  addConfigIsLoading: false,
  addConfigIsSuccess: false,
  addConfigError: { hasError: false, description: '' },
  updateConfigIsLoading: false,
  updateConfigIsSuccess: false,
  updateConfigError: { hasError: false, description: '' },
  deleteConfigIsLoading: false,
  deleteConfigIsSuccess: false,
  deleteConfigError: { hasError: false, description: '' },
  setAsActiveLoading: false,
  setAsActiveIsSuccess: false,
  setAsActiveError: { hasError: false, description: '' },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    getAllConfigs(state) {
      state.getAllConfigIsLoading = true;
      state.getAllConfigError = { hasError: false, description: '' };
    },
    getAllConfigSuccess(state, action: PayloadAction<AllConfigs>) {
      state.getAllConfigIsLoading = false;
      state.getAllConfigIsSuccess = true;
      state.allConfigs = action.payload;
    },
    getAllConfigError(state, action: PayloadAction<string>) {
      state.getAllConfigIsLoading = false;
      state.getAllConfigError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getConfig(state, action: PayloadAction<string>) {
      state.getConfigIsLoading = true;
      state.getConfigError = { hasError: true, description: '' };
    },
    getConfigSuccess(state, action: PayloadAction<Config>) {
      state.getConfigIsLoading = false;
      state.config = action.payload;
      state.getConfigIsSuccess = true;
    },
    getConfigError(state, action: PayloadAction<string>) {
      state.getConfigIsLoading = false;
      state.getConfigError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addConfig(state, action: PayloadAction<Config>) {
      state.addConfigIsLoading = true;
      state.addConfigError = { hasError: true, description: '' };
    },
    addConfigSuccess(state) {
      state.addConfigIsLoading = false;
      state.addConfigIsSuccess = true;
    },
    addConfigError(state, action: PayloadAction<string>) {
      state.addConfigIsLoading = false;
      state.addConfigError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConfig(state, action: PayloadAction<Config>) {
      state.updateConfigIsLoading = true;
      state.updateConfigError = { hasError: true, description: '' };
    },
    updateConfigSuccess(state) {
      state.updateConfigIsLoading = false;
      state.updateConfigIsSuccess = true;
    },
    updateConfigError(state, action: PayloadAction<string>) {
      state.updateConfigIsLoading = false;
      state.updateConfigError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteConfig(state, action: PayloadAction<string>) {
      state.deleteConfigIsLoading = true;
      state.deleteConfigError = { hasError: true, description: '' };
    },
    deleteConfigSuccess(state) {
      state.deleteConfigIsLoading = false;
      state.deleteConfigIsSuccess = true;
    },
    deleteConfigError(state, action: PayloadAction<string>) {
      state.deleteConfigIsLoading = false;
      state.deleteConfigError = { hasError: true, description: action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setConfigAsActive(state, action: PayloadAction<string>) {
      state.setAsActiveLoading = true;
      state.setAsActiveError = { hasError: true, description: '' };
    },
    setConfigAsActiveSuccess(state) {
      state.setAsActiveLoading = false;
      state.setAsActiveIsSuccess = true;
    },
    setConfigAsActiveError(state, action: PayloadAction<string>) {
      state.setAsActiveLoading = false;
      state.setAsActiveError = { hasError: true, description: action.payload };
    },
  },
});

// Actions
export const configActions = configSlice.actions;

// Selectors
export const selectAllConfigs = (state: RootState) =>
  state.configReducer.allConfigs;
export const selectAllConfigsIsLoading = (state: RootState) =>
  state.configReducer.getAllConfigIsLoading;
export const selectAllConfigsIsSuccess = (state: RootState) =>
  state.configReducer.getAllConfigIsSuccess;
export const selectAllConfigsError = (state: RootState) =>
  state.configReducer.getAllConfigError;
export const selectConfig = (state: RootState) => state.configReducer.config;
export const selectConfigIsLoading = (state: RootState) =>
  state.configReducer.getConfigIsLoading;
export const selectConfigIsSuccess = (state: RootState) =>
  state.configReducer.getConfigIsSuccess;
export const selectConfigError = (state: RootState) =>
  state.configReducer.getConfigError;
export const selectConfigUpdateIsLoading = (state: RootState) =>
  state.configReducer.updateConfigIsLoading;
export const selectConfigUpdateIsSuccess = (state: RootState) =>
  state.configReducer.updateConfigIsSuccess;
export const selectConfigUpdateError = (state: RootState) =>
  state.configReducer.updateConfigError;
export const selectConfigDeleteIsLoading = (state: RootState) =>
  state.configReducer.deleteConfigIsLoading;
export const selectConfigDeleteIsSuccess = (state: RootState) =>
  state.configReducer.deleteConfigIsSuccess;
export const selectConfigDeleteError = (state: RootState) =>
  state.configReducer.deleteConfigError;
export const selectConfigSetAsActiveLoading = (state: RootState) =>
  state.configReducer.setAsActiveLoading;
export const selectConfigSetAsActiveIsSuccess = (state: RootState) =>
  state.configReducer.setAsActiveIsSuccess;
export const selectConfigSetAsActiveError = (state: RootState) =>
  state.configReducer.setAsActiveError;

// Reducer
const configReducer = configSlice.reducer;
export default configReducer;
