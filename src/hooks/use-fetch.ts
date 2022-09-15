import { useState } from "react";
import { SnackBar } from "../components/SnackBar";
import { fetchParams, getCall, postCall, postFormData } from "../utils/service";

export type IResponse = {
  data?: any;
  loading?: boolean;
  error?: string;
  fetch?: any;
};

const useFetch = (): IResponse => {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setData] = useState<any>(undefined);
  const [error, serError] = useState<any>(undefined);

  const fetch = async (url: string, payLoad?: any, methodName = "POST") => {
    setloading(true);
    try {
      let response;
      switch (methodName) {
        case "POST":
          response = await postCall(url, payLoad);
          break;
        case "DELETE":
          response = await fetchParams(url, payLoad, methodName);
          break;
        case "GET":
          response = await getCall(url, payLoad);
        case "FORM-DATA":
          response = await postFormData(url, payLoad);
          break;
      }

      console.log("response", response);
      if ((response && response?.status === 201) || response?.status === 200) {
        const JsonResponse = await response.json();
        console.log("JsonResponse", JsonResponse);
        setData(JsonResponse);
      } else {
        const JsonResponse = await response.json();
        throw new Error(JsonResponse?.message);
      }
    } catch (error: any) {
      console.log("error", error);
      SnackBar({
        indicationMessage: error?.message,
      });
      serError({ message: error });
    }
    setloading(false);
  };

  return {
    data,
    loading,
    error,
    fetch,
  };
};

export { useFetch };
