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
    } catch (error) {
      SnackBar({
        indicationMessage: "Retry",
        actionMessage: "Internal Server Error",
      });
    }
    dispatch({
      type: ACTION_TYPES.GENERATED_KEYS_RESPONSE,
      payload: {
        responseData,
      },
    });
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
    } catch (error) {
      SnackBar({
        indicationMessage: "Internal Server Error",
      });
    }
    dispatch({
      type: ACTION_TYPES.CREATED_ACCOUNT_RESPONSE,
      payload: {
        responseData,
        isLoading: false,
      },
    });
  };

export const contractCall =
  (requestPayload: any) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.CONTRACT_CALL,
      });
      const response = await postCall(contractUrl, requestPayload);
      responseData = await _responseHandler(response);
    } catch (error) {
      console.log("GeneratedKeysAction API===>", error);
    }
    dispatch({
      type: ACTION_TYPES.CONTRACT_CALL_RESPONSE,
      payload: {
        isLoading: false,
        responseData,
      },
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
