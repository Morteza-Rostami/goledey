
export const SUCCEED = 'SUCCEED';
export const FAILED = 'FAILED'; 

//300
export const OTP_TIME = 120; // 2m

export const ROLES = {
  ADMIN: 'ADMIN',
}

export const UNPAID = 'UNPAID';
export const ONGOING = 'ONGOING';
export const DELIVERED = 'DELIVERED';
export const CANCELED = 'CANCELED';

// error messages
export const ACTION_FAILED = `ارتباط ممکن نمیباشد.`;
export const ADD_ITEM_SUCCESS  = `محصول به سبد افزوده شد.`;

// zarinpal merchantID
export const MERCHANT_ID = 'ae6dde45-d4a1-44cb-a05e-6fa447591f25';
export const ZPAL_CALLBACK = 'http://localhost:3000/payment/loadscreen';
// send first pay info to zpal
export const ZPAL_PAY = 'https://api.zarinpal.com/pg/v4/payment/request.json';
// zpal checkout page:
export const ZPAL_CHECK = 'https://www.zarinpal.com/pg/StartPay/';
// zpal verify payment:
export const ZPAL_VERIFY = 'https://api.zarinpal.com/pg/v4/payment/verify.json';
