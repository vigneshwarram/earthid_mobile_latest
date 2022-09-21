import { getCall, getCallWithHeader, postCall, ssiPostCall } from "../../utils/service";
import { ACTION_TYPES } from "./types";
import { URI } from "../../constants/URLContstants";
import { ICreateAccount } from "../../typings/AccountCreation/ICreateAccount";
import { SnackBar } from "../../components/SnackBar";
import { getUserDetails } from "../../utils/encryption";
import { IUserAccountRequest } from "../../typings/AccountCreation/IUserAccount";
import { IUserSchemaRequest } from "../../typings/AccountCreation/IUserSchema";
const {
  ACCOUNT: {
    CREATE_ACCOUNT: createAccountUrl,
    GENERATE_KEYS: generateKeyUrl,
    APPROVE_EMAIL_OTP: approveOTPEmail,
  },
} = URI;

let createSchemaUrl=" https://ssi-gbg.myearth.id/api/issuer/createSchema"

export const GeneratedKeysAction =
  () =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.GENERATED_KEYS_LOADING,
      });
      const response = await getCallWithHeader(
        "https://api-stage.myearth.id/contract/generateKeys"
      );
      responseData = await _responseHandler(response);
      console.log("responseData", responseData);
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
    } catch (error) {
      console.log("create account API catch ===>", error);
      dispatch({
        type: ACTION_TYPES.CREATED_ACCOUNT_ERROR,
        payload: {
          errorMesssage: error,
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
      console.log("create account API catch ===>", error);
      dispatch({
        type: ACTION_TYPES.CREATED_SCHEMA_ERROR,
        payload: {
          errorMesssage: error,
        },
      });
    }
  };

// export const contractCall =
//   (requestPayload: any) =>
//   async (dispatch: any): Promise<any> => {
//     let responseData, userDetails;
//     try {
//       dispatch({
//         type: ACTION_TYPES.CONTRACT_CALL,
//       });
//       const response = await postCall(contractUrl, requestPayload);
//       responseData = await _responseHandler(response);
//       userDetails = getUserDetails(responseData);
//       dispatch({
//         type: ACTION_TYPES.CONTRACT_CALL_RESPONSE,
//         payload: {
//           isLoading: false,
//           responseData: userDetails,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPES.CONTRACT_CALL_ERROR,
//       });
//       console.log("Contarct API catch ===>", error);
//     }
//   };

export const approveOTP =
  (requestPayload: any) =>
  async (dispatch: any): Promise<any> => {
    let responseData;
    try {
      dispatch({
        type: ACTION_TYPES.APPROVE_OTP,
      });
      const response = await postCall(approveOTPEmail, requestPayload);
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
      console.log("coming==>", "comingerror");
      SnackBar({
        indicationMessage: responseData?.message,
      });
      reject(responseData.message);
    }
  });
};
