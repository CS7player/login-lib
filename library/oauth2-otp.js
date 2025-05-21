const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// === OAuth2 Setup ===
const oAuth2Client = new google.auth.OAuth2(
 OAUTH2_CLIENT_ID,
 OAUTH2_CLIENT_SECRET,
 OAUTH2_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });

// === OTP Generator ===
const generateAlphanumericOTP = (length = 6) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let otp = '';
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
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: OAUTH2_SENDER_EMAIL,
        clientId: OAUTH2_CLIENT_ID,
        clientSecret: OAUTH2_CLIENT_SECRET,
        refreshToken: OAUTH2_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    let user_mail = data['mail'];
    let otp = generateAlphanumericOTP(); // ✅ Correct way to generate

    const mailOptions = {
      from: `OTP Service <${OAUTH2_SENDER_EMAIL}>`,
      to: user_mail,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    const result = await transport.sendMail(mailOptions);
    return { result, otp }; // Optional: return OTP too
  } catch (error) {
    throw new Error("Error at OTP Generation!"); // Custom error class is fine if defined elsewhere
  }
};
