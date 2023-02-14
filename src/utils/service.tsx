import { ssiApiKey } from "./earthid_account";

/**
 * @function postFormData - function to call the backend with the request and fetches response.
 * @param requestURI - string uri of the request
 * @param payload - Form data to be posted as a property with key/value pairs, like {key1: value1, key2: value2}
 */
// export const postFormData = async (requestURI: string, payload: any) => {

//   const formData = new FormData();
//   console.log("payload", payload);
//   formData.append("image", payload);
//   formData.append("image", {uri: "", name: 'image.jpg', type: 'image/jpeg'}), 
//   console.log("FormData==>", "FormData");
//   console.log("request==>::::::::::::", JSON.stringify(payload));

//   return await fetch(requestURI, {
//     method: "POST",
//     headers: {
//     "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   });
// };


export const postFormData = async (requestURI: string, payload: any) => {
  const formData = new FormData();
  formData.append('image', {uri: payload?.uri, name: payload?.name, type: payload?.type}), 
  console.log("FormData==>", "FormData");
  console.log("request==>::::::::::::", JSON.stringify(payload));

  return await fetch(requestURI, {
    method: "POST",
    headers: {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
};


/**
 * @function postCall - function to call the backend with the request and fetches response
 * @param uri - string uri of the request
 * @param payload - body data to be posted as a json object key value pair,like {key1: value1, key2: value2}
 */
export const postCall = (
  uri: string,
  payload?: any,
  method: string = "POST"
): Promise<any> => {
  console.log("url==>", uri);
  console.log("request==>::::::::::::", JSON.stringify(payload));

  return fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
      authkey: "fae2622d-7b73-4fc6-a536-202cabe75187",
    },
    body: JSON.stringify(payload),
  });
};

export const fetchParams = (
  uri: string,
  payload: any,
  method: string = "DELETE"
): Promise<any> => {
  console.log("method coming");
  return fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

/**
 * @function getCall - function to call the backend with the request and fetches response
 * @param uri - string uri of the request
 * @param payload - body data to be posted as a json object key value pair,like {key1: value1, key2: value2}
 */
export const getCall = (uri: string, method: string = "GET"): any => {
  return fetch(uri);
};

export const getCallWithHeader = (uri: string, method: string = "GET"): any => {
  return fetch(uri, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      authkey: "fae2622d-7b73-4fc6-a536-202cabe75187",
    },
  });
};

/**
 * @function getCall - function to call the backend with the request and fetches response
 * @param uri - string uri of the request
 * @param payload - body data to be posted as a json object key value pair,like {key1: value1, key2: value2}
 */
export const ssiGetCall = (
  uri: string,
  method: string = "GET",
  key: string
): any => {
  return fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": ssiApiKey,
      publicKey: key,
    },
  });
};

export const ssiPostCall = (
  uri: string,
  payload?: any,
  method: string = "POST",
  data: any = {
    payload,
  }
): Promise<any> => {
  console.log("requests==>", JSON.stringify(payload));

  return fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": ssiApiKey,
    },
    body: JSON.stringify(payload),
  });
};
