import nodemailer from "nodemailer";

type email = {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
};

const sendMail = (email: email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  transporter.sendMail(email, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendSecretMail = (secret: string, address: string) => {
  const email: email = {
    from: process.env.NODEMAILER_USER,
    to: address,
    subject: "이메일 인증",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };
  sendMail(email);
};

const sendResetPasswordEmail = (url: string, address: string) => {
  const email: email = {
    from: process.env.NODEMAILER_USER,
    to: address,
    subject: "비밀번호 초기화",
    html: `<div>아래의 URL을 통해 비밀번호를 초기화 해주세요.</div><div>${url}</div>`,
  };
  sendMail(email);
};

export { sendSecretMail, sendResetPasswordEmail };
