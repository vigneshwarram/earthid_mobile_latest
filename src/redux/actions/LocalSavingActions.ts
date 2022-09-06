import { ACTION_TYPES } from "./types";

export const savingCustomQrData =
  (qrListData: any) =>
  async (dispatch: any): Promise<any> => {
    dispatch({
      type: ACTION_TYPES.SAVE_QR,
      qrListData,
    });
  };
