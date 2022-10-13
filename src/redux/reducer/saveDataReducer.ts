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
      return { ...state, profileData, isLoading: true };
    default:
      return { ...state };
  }
};
