import { ACTION_TYPES } from "../actions/types";

export const SavedQrData = (state = {}, { type, qrListData }: any) => {
  switch (type) {
    case ACTION_TYPES.SAVE_QR:
      return { ...state, qrListData, isLoading: true };
    default:
      return { ...state };
  }
};
export const SavedProfilePictures = (
  state = {},
  { type, profileData }: any
) => {
  switch (type) {
    case ACTION_TYPES.SAVE_PROFILE_PIC:
      return { ...state, profileData };
    default:
      return { ...state };
  }
};

export const SavedSecurityDatas = (state = {}, { type, securityData }: any) => {
  console.log("type===>", securityData);
  switch (type) {
    case ACTION_TYPES.SAVE_SECURITY:
      console.log("securityDataReducer===>", securityData);
      return { ...state, securityData };
    default:
      return { ...state };
  }
};
