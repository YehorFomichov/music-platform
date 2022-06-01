import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
  },
  reducers: {
    modalOpened: (state) => {
      state.open = true;
    },
    modalClosed: (state) => {
      state.open = false;
    },
  },
});
const { reducer: modalReducer } = modalSlice;
const { modalOpened, modalClosed } = modalSlice.actions;
export const openModal = () => (dispatch) => {
  dispatch(modalOpened());
};
export const closeModal = () => (dispatch) => {
  dispatch(modalClosed());
};
export const getModal = () => (state) => state.modal.open;
export default modalReducer;
