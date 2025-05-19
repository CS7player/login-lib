const myCustomError = require("./custom-error");
const bcrypt = require("bcrypt");
//PBKDF – Password-Based Key Derivation Function
/*
PBKDF stands for Password-Based Key Derivation Function. It’s a key derivation 
function that's used to derive a secure cryptographic key from a human-readable 
password, which is typically less secure on its own.
*/
exports.hashPassword = async (password,saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new myCustomError("Error at HashingPassword!");
  }
};

exports.checkPassword = async (password, hashPassword) => {
  try {
    const match = await bcrypt.compare(password, hashPassword);
    if (match) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new myCustomError("Error at CheckPassword!");
  }
};
