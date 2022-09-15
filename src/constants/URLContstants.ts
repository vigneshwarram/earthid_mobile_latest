// @ts-ignore
export const EARTHID_DEV_BASE = "https://apiv2.myearth.id";

export const URI = {
  ACCOUNT: {
    GENERATE_KEYS: `${EARTHID_DEV_BASE}/contract/generateKeys`,
    CREATE_ACCOUNT: `${EARTHID_DEV_BASE}/user/registration`,
    APPROVE_EMAIL_OTP: `${EARTHID_DEV_BASE}/verification/emailVerify`,
    CONTRACT_CALL: `${EARTHID_DEV_BASE}/contract/functionCall`,
  },
};

export const ALLOWED_DOMAINS = [
  ".amazon.in",
  ".amazon.com",
  ".media-amazon.com",
];

export const PARAM_KEYS = {
  DEFAULT_STORE_NAME: "storeName",
  DISBURSEMENT_PAYMENT_METHOD: "paymentMethod",
  PIN_CODE: "pinCode",
  COUNTRY_CODE: "countryCode",
  PAGE_ID: "pageId",
  LOCALE: "locale",
};

export const HEADER_KEYS = {
  USER_AGENT: "User-Agent",
};
