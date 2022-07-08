export const userReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    default:
      return type ? { ...state, ...payload } : state;
  }
};
export default userReducer;
