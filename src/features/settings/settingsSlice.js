import { createSlice } from '@reduxjs/toolkit';
import { apiCall } from '../../app/apiCall';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    pages: [],
    loading: false,
  },
  reducers: {
    getPagesStart: (state) => {
      state.loading = true;
    },
    getPagesSuccess: (state, action) => {
      state.loading = false;
      state.pages = action.payload;
    },
    getPagesFailure: (state) => {
      state.loading = false;
    },
  },
});

const {
  getPagesStart,
  getPagesSuccess,
  getPagesFailure,
} = settingsSlice.actions;

export const getPages = () => {
  return async (dispatch) => {
    dispatch(getPagesStart());
    try {
      const response = await apiCall.get('/pages');
      dispatch(getPagesSuccess(response.data));
    } catch (err) {
      dispatch(getPagesFailure());
    }
  };
};

export const settingsReducer = settingsSlice.reducer;
