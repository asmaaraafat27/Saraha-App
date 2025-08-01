import CryptoJS from "crypto-js";

export const encrypt =({plainText, signature= process.env.ENCRYPTION_SECRET})=> {
    return CryptoJS.AES.encrypt(plainText, signature)
    .toString()
};

export const decrypt =({encrypted, signature= process.env.ENCRYPTION_SECRET})=> {
    return CryptoJS.AES.decrypt(encrypted, signature)
    .toString(CryptoJS.enc.Utf8)
};