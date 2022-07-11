export const AES_ENCRYPTION_SALT = "qaszxswedcvfrtgbnhyujmkik";
import DeviceInfo from "react-native-device-info";
import CryptoJS from "react-native-crypto-js";
import { iv, keyutf } from "./earthid_account";
export const encrptedEmail = (email: string): string => {
  return CryptoJS.AES.encrypt(
    email.toString().trim(),
    AES_ENCRYPTION_SALT
  ).toString();
};
export const getDeviceId = async () => {
  const deviceToken = await DeviceInfo.getDeviceToken();
  return deviceToken;
};
export const getEncrptedUserDetais = (data: any): string[] => {
  var dataArray = [
    data.fullName,
    data.mobileNumber,
    data.email,
    data.dateOfBirth,
  ];
  return dataArray.map((element) => {
    let encryptedData = CryptoJS.AES.encrypt(element, keyutf, { iv: iv });
    return encryptedData.toString();
  });
};
