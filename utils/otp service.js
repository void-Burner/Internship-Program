const crypto = require("crypto")

const OtpMap = new Map();
const Otp_Expire_Time = 5 * 60 * 1000; // 5 minutes in milliseconds

const generateOtp = (email) => {
    const number = crypto.randomInt(0, 1000000);
    const otp = String(number).padStart(6, "0");
    const expire = Date.now() + Otp_Expire_Time;
    OtpMap.set(email, { otp, expire });

    setTimeout(() => {
        const otpEntry = OtpMap.get(email);
        if(otpEntry) OtpMap.delete(email);
    }, Otp_Expire_Time);

    return otp;
}

module.exports = { generateOtp };