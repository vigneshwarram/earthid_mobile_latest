import { ACTION_TYPES } from "../actions/types";
const initialState = {
  isLoading: false,
  responseData: {},
};

export const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.GENERATED_KEYS_LOADING:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GENERATED_KEYS_RESPONSE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export const accountReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.CREATEDACCOUNT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.CREATED_ACCOUNT_RESPONSE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const contractReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.CONTRACT_CALL:
      return { ...state, isLoading: true };
    case ACTION_TYPES.CONTRACT_CALL_RESPONSE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export default { userReducer, accountReducer, contractReducer };
