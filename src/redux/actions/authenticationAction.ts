import { getCall, postCall } from "../../utils/service";
import { ACTION_TYPES } from "./types";
import { URI } from "../../constants/URLContstants";
import { ICreateAccount } from "../../typings/AccountCreation/ICreateAccount";
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
    try {
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_LOADING,
      });
      const response = await getCall(generateKeyUrl);
      const responseData = _responseHandler(response);
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_RESPONSE,
        payload: {
          isLoading: false,
          responseData,
        },
      });
    } catch (error) {
      console.log("GeneratedKeysAction API===>", error);
    }
  };

export const createAccount =
  (requestPayload: ICreateAccount) =>
  async (dispatch: any): Promise<any> => {
    try {
      dispatch({
        type: ACTION_TYPES.CREATEDACCOUNT,
        payload: {
          isGeneratedKeysLoading: true,
        },
      });
      const response = await postCall(createAccountUrl, requestPayload);
      const responseData = _responseHandler(response);
      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_RESPONSE,
        payload: {
          isLoading: false,
          responseData,
        },
      });
    } catch (error) {
      console.log("GeneratedKeysAction API===>", error);
    }
  };

export const contractCall = (requestPayload: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: ACTION_TYPES.CONTRACT_CALL,
      payload: {
        isGeneratedKeysLoading: true,
      },
    });
    const response = await postCall(contractUrl, requestPayload);
    const responseData = _responseHandler(response);
    dispatch({
      type: ACTION_TYPES.CONTRACT_CALL_RESPONSE,
      payload: {
        isLoading: false,
        responseData,
      },
    });
  } catch (error) {
    console.log("GeneratedKeysAction API===>", error);
  }
};

const _responseHandler = async (response: any) => {
  const responseData = await response.json();
  if (responseData.code === 200 || responseData.code === 400) {
    return responseData;
  } else {
    return (responseData["message"] = "Internal Server Error");
  }
};
