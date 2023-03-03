import Melipayamak from 'melipayamak';
//import MelipayamakApi from 'melipayamak-api'

const UserHelp = {

  sendSms: async (otp, to, txt=[], bodyId) => {
    const userName = '09905995768';
    const password = 'NT79$';
    //const from = '50004001995768';

    const api = new Melipayamak(userName, password);

    // sms object
    const sms = api.sms();

    
    const response = await sms.sendByBaseNumber(txt, to, bodyId);
    return response;

  },
}


export default UserHelp