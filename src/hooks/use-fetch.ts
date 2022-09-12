import { useState } from "react";
import { deleteCall, getCall, postCall } from "../utils/service";

export type IResponse = {
  data?: any;
  loading?: boolean;
  error?: string;
  fetch?: any;
  deletefetch?:any
  fetchApi?:any
};

const useFetch = (): IResponse => {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setData] = useState<any>(undefined);
  const [error, serError] = useState<any>(undefined);

  const fetch = async (url: string, reuestData?: any, methodName = "POST") => {
    setloading(true);
    try {
      const response =
        methodName === "POST"
          ? await postCall(url, reuestData)
          : await getCall(url);
      console.log("response", response);
      if (response.status === 201 || response.status === 200) {
        const JsonResponse = await response.json();
        console.log("JsonResponse", JsonResponse);
        setData(JsonResponse);
      } else {
        const JsonResponse = await response.json();
        throw new Error(JsonResponse.message);
      }
    } catch (error) {
      console.log("error", error);
      serError(error);
    }
    setloading(false);
  };


  const fetchApi = async (url: string, reuestData?: any, methodName?:string) => {
    setloading(true);
    try {
      let response
       switch(methodName){
        case "POST":
          response = await postCall(url, reuestData)
          break;
        case "DELETE":
          response = await deleteCall(url, reuestData)
          break;
        case "GET":
          response = await getCall(url, reuestData)
          break;
      }
        // methodName === "POST"
        //   ? await postCall(url, reuestData)
        //   : await getCall(url);
      console.log("response", response);
      if (response.status === 201 || response.status === 200) {
        const JsonResponse = await response.json();
        console.log("JsonResponse", JsonResponse);
        setData(JsonResponse);
      } else {
        const JsonResponse = await response.json();
        throw new Error(JsonResponse.message);
      }
    } catch (error) {
      console.log("error", error);
      serError(error);
    }
    setloading(false);
  };



  const deletefetch = async (url: string, reuestData?: any, methodName = "DELETE") => {
    setloading(true);
    try {
      const response =
        methodName === "DELETE"
          ? await deleteCall(url, reuestData)
          : await getCall(url);
      console.log("response", response);
      if (response.status === 201 || response.status === 200) {
        const JsonResponse = await response.json();
        console.log("JsonResponse", JsonResponse);
        setData(JsonResponse);
      } else {
        const JsonResponse = await response.json();
        throw new Error(JsonResponse.message);
      }
    } catch (error) {
      console.log("error", error);
      serError(error);
    }
    setloading(false);
  };

  return {
    data,
    loading,
    error,
    fetch,
    deletefetch,
    fetchApi

  };
};

export { useFetch };
