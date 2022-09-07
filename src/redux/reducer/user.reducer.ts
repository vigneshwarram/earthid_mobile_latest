import { SnackBar } from "../../components/SnackBar";
import { ACTION_TYPES } from "../actions/types";
const initialState = {
  isLoading: false,
};

export const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.GENERATED_KEYS_LOADING:
      return {
        ...state,
        isLoading: true,
        isGeneratedKeySuccess: false,
        isGeneratedKeyError: false,
      };
    case ACTION_TYPES.GENERATED_KEYS_RESPONSE:
      return {
        ...state,
        ...payload,
        isGeneratedKeySuccess: true,
        isGeneratedKeyError: false,
      };
    case ACTION_TYPES.GENERATED_KEYS_ERROR:
      return {
        ...state,
        ...payload,
        isGeneratedKeySuccess: false,
        isGeneratedKeyError: true,
      };
    default:
      return state;
  }
};
export const accountReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.CREATEDACCOUNT:
      return {
        ...state,
        isLoading: true,
        isAccountCreatedSuccess: false,
        isAccountCreatedFailure: false,
      };
    case ACTION_TYPES.CREATED_ACCOUNT_RESPONSE:
      return {
        ...state,
        ...payload,
        isAccountCreatedSuccess: true,
        isLoading: false,
        isAccountCreatedFailure: false,
      };
    case ACTION_TYPES.CREATED_ACCOUNT_ERROR:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAccountCreatedSuccess: false,
        isAccountCreatedFailure: true,
      };
    default:
      return state;
  }
};

export const contractReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.CONTRACT_CALL:
      return {
        ...state,
        isLoading: true,
        isUserDetailsCreatedSuccessfull: false,
        isUserDetailsCreatedFailure: false,
      };
    case ACTION_TYPES.CONTRACT_CALL_RESPONSE:
      return {
        ...state,
        ...payload,
        isUserDetailsCreatedSuccessfull: true,
        isUserDetailsCreatedFailure: false,
      };
    case ACTION_TYPES.CONTRACT_CALL_ERROR:
      return {
        ...state,
        ...payload,
        isUserDetailsCreatedSuccessfull: false,
        isUserDetailsCreatedFailure: true,
      };
    default:
      return state;
  }
};

export const approveOTPReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.APPROVE_OTP:
      return { ...state, isLoading: true };
    case ACTION_TYPES.APPROVEOTP_RESPONSE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const documentListReducer = (state = {}, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.SAVE_DOCUMENTS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
