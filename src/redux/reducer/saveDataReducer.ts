import { ACTION_TYPES } from "../actions/types";

export const SavedQrData = (state = {}, { type, qrListData }: any) => {
  switch (type) {
    case ACTION_TYPES.SAVE_QR:
      return { ...state, qrListData, isLoading: true };
    default:
      return { ...state };
  }
};
export default {
  SavedQrData,
};
