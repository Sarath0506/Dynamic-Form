import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    submittedData: [],
  },
  reducers: {
    addData: (state, action) => {
      state.submittedData.push(action.payload);
    },
    updateData: (state, action) => {
      const { index, data } = action.payload;
      state.submittedData[index] = data;
    },
    deleteData: (state, action) => {
      state.submittedData.splice(action.payload, 1);
    },
  },
});

export const { addData, updateData, deleteData } = formSlice.actions;
export default formSlice.reducer;
