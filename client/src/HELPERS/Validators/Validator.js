

const VALID = {

  emailValidator: (email) => {
    if (!email) {
      return "ایمیل الزامی است.";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "ایمیل معتبر نمی باشد.";
    }
    return "";
  },

  nameValidator: (name) => {
    if (!name) {
      return "اسم الزامی است.";
    } else if (name.length < 6) {
      return "اسم باید بیشتر از ۶ کاراکتر باشد."
    } else if (name.length > 30) {
      return "اسم باید کمتر از ۳۰ کاراکتر باشد."
    }
    return "";
  }, 

  creditCardValidator: (creditCard) => {
    if (!creditCard) {
      return "شماره کارت بانکی الزامی است."

      // remove all white spaces
    } else if (creditCard.replace(/ /g,'').length !== 16) {
      console.log(creditCard.length);
      return "شماره کارت باید ۱۶ کاراکتر باشد.";
    }
    return "";
  },

  addressValidator: (address) => {
    if (!address) {
      return 'آدرس الزامی است.'
    }
    return '';
  },



}


export default VALID;