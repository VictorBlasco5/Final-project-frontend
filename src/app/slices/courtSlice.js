import { createSlice } from '@reduxjs/toolkit';

export const courtSlice = createSlice({
  name: 'court',
  initialState: {
    courtId: null
  },
  reducers: {
    selectCourt: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    },
}
});

export const { selectCourt } = courtSlice.actions;

export const selectCourtId = (state) => state.court;
export default courtSlice.reducer;