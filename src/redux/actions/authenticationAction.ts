import {
  getCall,
  getCallWithHeader,
  postCall,
  ssiGetCall,
  ssiPostCall,
} from "../../utils/service";
import { ACTION_TYPES } from "./types";
import { URI } from "../../constants/URLContstants";
import { SnackBar } from "../../components/SnackBar";
import { IUserAccountRequest } from "../../typings/AccountCreation/IUserAccount";
import { IUserSchemaRequest } from "../../typings/AccountCreation/IUserSchema";
const {
  ACCOUNT: {
    CREATE_ACCOUNT: createAccountUrl,
    GENERATE_KEYS: generateKeyUrl,
    APPROVE_EMAIL_OTP: approveOTPEmail,
    APPROVE_PHONE_OTP: approvePhoneOtp,
    GET_HISTORY: get_History,
    GET_USERDID: getUser_did,
    GENERATE_KEYS:generateKeys
  },
} = URI;

let createSchemaUrl = "https://ssi-gbg.myearth.id/api/issuer/createSchema";

export const GeneratedKeysAction =
  () =>
  async (dispatch: any): Promise<any> => {
    let responseData, responseDataSSI;
    try {
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_LOADING,
      });
      const response = await getCallWithHeader(
        "https://api-stage.myearth.id/contract/generateKeys"
      );
      responseData = await _responseHandler(response);
      console.log("reuesturl===>", getUser_did);
      console.log("reuestparams===>", responseData);
      const responsedataSSI = await ssiGetCall(
        getUser_did,
        "GET",
        responseData?.result?.publicKey
      );
      responseDataSSI = await _responseHandler(responsedataSSI);
      console.log("responseDatassi==>", responseDataSSI);
      const data = {
        userDid: responseDataSSI.data,
      };
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_RESPONSE,
        payload: {
          responseData: { ...responseData, ...data },
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
  (requestPayload: IUserAccountRequest) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.CREATEDACCOUNT,
      });
      const response = await postCall(createAccountUrl, requestPayload);

      responseData = await _responseHandler(response);
      console.log("responseData", responseData);
      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_RESPONSE,
        payload: {
          responseData,
          isLoading: false,
          errorMesssage: "",
        },
      });
    } catch (error: any) {
      console.log("create account API catch ===>", error);

      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_ERROR,
        payload: {
          errorMesssage: error,
          isLoading: false,
        },
      });
    }
  };

export const createSchema =
  (requestPayload: IUserSchemaRequest) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.CREATEDSCHEMA,
      });
      const response = await ssiPostCall(createSchemaUrl, requestPayload);
      responseData = await _responseHandler(response);
      console.log("responseData", responseData);
      dispatch({
        type: ACTION_TYPES.CREATED_SCHEMA_RESPONSE,
        payload: {
          responseData,
          isLoading: false,
          errorMesssage: "",
        },
      });
    } catch (error) {
      console.log(" API catch ===>", error);
      dispatch({
        type: ACTION_TYPES.CREATED_SCHEMA_ERROR,
        payload: {
          errorMesssage: error,
        },
      });
    }
  };

export const approveOTP =
  (requestPayload: any, type: string) =>
  async (dispatch: any): Promise<any> => {
    console.log("type", type);
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.APPROVE_OTP,
      });
      let response;
      if (type === "phone") {
        response = await postCall(approvePhoneOtp, requestPayload);
      } else {
        response = await postCall(approveOTPEmail, requestPayload);
      }

      responseData = await _responseHandler(response);
      console.log("responseData==>", responseData);

      dispatch({
        type: ACTION_TYPES.APPROVEOTP_RESPONSE,
        payload: {
          responseData,
          errorMesssage: "",
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ACTION_TYPES.APPROVEOTP_ERROR,
        payload: {
          errorMesssage: error,
        },
      });
    }
  };

export const getHistory =
  (requestPayload: any) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.GET_HISTORY_CALL,
      });
      const response = await getCall(
        `${get_History}?userId=${requestPayload?.userId}&publicKey=${requestPayload?.publicKey}`
      );
      responseData = await _responseHandler(response);
      console.log("responseData==>", responseData);

      dispatch({
        type: ACTION_TYPES.GET_HISTORY_CALL_RESPONSE,
        payload: {
          responseData,
          errorMesssage: "",
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ACTION_TYPES.GET_HISTORY_CALL_ERROR,
        payload: {
          errorMesssage: error,
        },
      });
    }
  };

export const byPassUserDetailsRedux =
  (userDetails: any) =>
  async (dispatch: any): Promise<any> => {
    dispatch({
      type: ACTION_TYPES.CREATED_ACCOUNT_RESPONSE,
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

  export const updateDocuments =
  (originalArrayOfDocuments:any,index: number,updatedObject:any) =>
  async (dispatch: any): Promise<any> => {
    originalArrayOfDocuments?.splice(index,1,updatedObject)
    dispatch({
      type: ACTION_TYPES.UPDATE_DOCUMENTS,
      payload: {
        isLoading: false,
        responseData: originalArrayOfDocuments,
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
  return new Promise(async (resolve, reject) => {
    if (response.status === 200 || response.status === 201) {
      const responseData = await response.json();

      return resolve(responseData);
    } else {
      const responseData = await response.json();
      reject(responseData.message);
    }
  });
};
