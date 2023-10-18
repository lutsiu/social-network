import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodetest2023@gmail.com",
    pass: "hhlppvtblhbjpprq",
  },
});
export default transporter;

export const sendMail = function (
  userEmail: string,
  confirmationCode: number,
  resend = false
) {
  transporter.sendMail({
    to: `${userEmail}`,
    from: "nodetest2023@gmail.com",
    subject: resend ? "Your new code" : "Confirmation code",
    html: `<div>
            <h1>You've almost done...</h1>
            <p>Enter this code to confirm your account</p>
            <span style="font-weight: bold; color: blue; font-size: 1.2rem;">${confirmationCode}</span> 
            </div>`,
  });
};
export const restorePassword = function (userEmail: string, userId: string) {
  transporter.sendMail({
    to: `${userEmail}`,
    from: "nodetest2023@gmail.com",
    subject: "Reset password",
    html: `<div>
            <a href="http://127.0.0.1:5173/restore-password/${userId}">Click here to set new password</a>
            </div>`,
  });
};
