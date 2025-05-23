const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// === OAuth2 Setup ===
const oAuth2Client = new google.auth.OAuth2(
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });

// === OTP Generator ===
const generateAlphanumericOTP = (length = 6) => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
};

// === Email Sender ===
exports.sendOTPEmail = async (data) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: OAUTH2_SENDER_EMAIL,
        clientId: OAUTH2_CLIENT_ID,
        clientSecret: OAUTH2_CLIENT_SECRET,
        refreshToken: OAUTH2_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
    let user_mail = data["mail"];
    let username = data["username"] || "";
    let otp = generateAlphanumericOTP();
    const mailOptions = {
      from: `OTP Service <${OAUTH2_SENDER_EMAIL}>`,
      to: user_mail,
      subject: "Your Sign-Up OTP Code",
      text: `To Username: ${username},\nYour OTP code is: ${otp}`,
      html: `<p>To Username: <strong>${username}</strong></p>
            <p>Your <strong>OTP</strong> code is: <strong>${otp}</strong></p>`,
    };
    if(username == ""){
      mailOptions["subject"] = "Your Forget-Password OTP Code";
      mailOptions["text"] = `Your OTP code is: ${otp} for changing password`;
      mailOptions["html"] = `<p>Your <strong>OTP</strong> code is: <strong>${otp}</strong> for changing password</p>`;
    }
    const result = await transport.sendMail(mailOptions);
    return { result, otp };
  } catch (error) {
    throw new Error("Error at OTP Generation!");
  }
};
