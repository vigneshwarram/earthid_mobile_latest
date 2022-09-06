import { getCall, postCall } from "../../utils/service";
import { ACTION_TYPES } from "./types";
import { URI } from "../../constants/URLContstants";
import { ICreateAccount } from "../../typings/AccountCreation/ICreateAccount";
import { SnackBar } from "../../components/SnackBar";
import { getUserDetails } from "../../utils/encryption";
const {
  ACCOUNT: {
    CREATE_ACCOUNT: createAccountUrl,
    GENERATE_KEYS: generateKeyUrl,
    CONTRACT_CALL: contractUrl,
  },
} = URI;

export const GeneratedKeysAction =
  () =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_LOADING,
      });
      const response = await getCall(generateKeyUrl);
      responseData = await _responseHandler(response);
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_RESPONSE,
        payload: {
          responseData,
        },
      });
    } catch (error) {
      console.log("generated key  API catch ===>", error);
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_ERROR,
      });
      SnackBar({
        indicationMessage: "Retry",
        actionMessage: "Internal Server Error",
      });
    }
  };

export const createAccount =
  (requestPayload: ICreateAccount) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.CREATEDACCOUNT,
      });
      const response = await postCall(createAccountUrl, requestPayload);
      responseData = await _responseHandler(response);
      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_RESPONSE,
        payload: {
          responseData,
          isLoading: false,
        },
      });
    } catch (error) {
      console.log("create account API catch ===>", error);
      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_ERROR,
      });
      SnackBar({
        indicationMessage: "Internal Server Error",
      });
    }
  };

export const contractCall =
  (requestPayload: any) =>
  async (dispatch: any): Promise<any> => {
    let responseData, userDetails;
    try {
      dispatch({
        type: ACTION_TYPES.CONTRACT_CALL,
      });
      const response = await postCall(contractUrl, requestPayload);
      responseData = await _responseHandler(response);
      userDetails = getUserDetails(responseData);
      dispatch({
        type: ACTION_TYPES.CONTRACT_CALL_RESPONSE,
        payload: {
          isLoading: false,
          responseData: userDetails,
        },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.CONTRACT_CALL_ERROR,
      });
      console.log("Contarct API catch ===>", error);
    }
  };

export const approveOTP =
  (requestPayload: any) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.APPROVE_OTP,
      });
      const response = await postCall(contractUrl, requestPayload);
      console.log("Approve OTP response===>", response);
      responseData = await _responseHandler(response);
    } catch (error) {
      console.log("Approve OTP API===>", error);
    }
    dispatch({
      type: ACTION_TYPES.APPROVEOTP_RESPONSE,
      payload: {
        isLoading: false,
        responseData,
      },
    });
  };
export const byPassUserDetailsRedux =
  (userDetails: any) =>
  async (dispatch: any): Promise<any> => {
    dispatch({
      type: ACTION_TYPES.CONTRACT_CALL_RESPONSE,
      payload: {
        isLoading: false,
        responseData: userDetails,
      },
    });
  };

export const saveDocuments =
  (documentsDetails: any) =>
  async (dispatch: any): Promise<any> => {
    dispatch({
      type: ACTION_TYPES.SAVE_DOCUMENTS,
      payload: {
        isLoading: false,
        responseData: documentsDetails,
      },
    });
  };

export const FlushData =
  () =>
  async (dispatch: any): Promise<any> => {
    dispatch({
      type: "DELETE",
    });
  };

const _responseHandler = async (response: any): Promise<any> => {
  const responseData = await response.json();
  return new Promise((resolve, reject) => {
    if (responseData.code === 200) {
      return resolve(responseData?.result);
    } else {
      SnackBar({
        indicationMessage: responseData?.message,
      });
      reject(responseData.message);
    }
  });
};
