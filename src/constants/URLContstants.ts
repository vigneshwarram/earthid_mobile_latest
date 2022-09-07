// @ts-ignore
const EARTHID_DEV_BASE = "http://35.154.54.127:3000";
const EARTHID_PROD_BASE = "https://api.myearth.id";

export const URI = {
  ACCOUNT: {
    GENERATE_KEYS: `${EARTHID_DEV_BASE}/contract/generateKeys`,
    CREATE_ACCOUNT: `${EARTHID_DEV_BASE}/user/manualRegistration`,
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
