import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: true,
  isExtensionOpen: false,
  navRoute: false,
};

export const ExtensionSlice = createSlice({
  name: 'extension',
  initialState,
  reducers: {
    handleToggle: (state, action) => {
      state.isExtensionOpen = action.payload;
    },
    handleOpenOption: (state, action) => {
      state.isExtensionOpen = action.payload.isOpen;
      state.isCollapsed = action.payload.isOpen;
      state.navRoute = action.payload.option;
    },
    handleToggleCollapse: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { handleToggle, handleToggleCollapse, handleOpenOption } = ExtensionSlice.actions;
export default ExtensionSlice.reducer;
