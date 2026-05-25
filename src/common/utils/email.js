import nodemailer from "nodemailer";

const transporter = nodemailer.createTestAccount({
  host: "example@yoof.com",
  port: 587,
  secure: true,
  auth: {
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASS}`,
  },
});

const sendMail = async (from, subject, to) => {
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}"<${SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendMail(
    email,
    "verify your email",
    `<h2>Welcome!</h2><p> <a href="${url}">to verify your email</a></p>`,
  );
}; //refers to register service.

const sendResetPasswordEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendMail(
    email,
    "Reset your password",
    `<h2>Password Reset</h2><p>Click<a href="${url}>here</a> to reset your password. This link expires in 15 minutes."`,
  );
};

// const sendConfirmationEmail = async (email, order) => {
//   const items = order.items
//     .map((i) => `<li>${i.title} x${i.quantity} - ${i.price}</li>`)
//     .join("");

//     await sendMail(
//         email,
//         `Order Confirmed - ${order.orderNumber}`,
//         `<h2>Order Confirmed </h2>,
//         <p>Order: ${order.orderNumber}</p>
//         <ul>${items}</ul>
//         <p><strong>Total: ${order.totalAmount}</strong></p>`
//     )
// };
export { sendMail, sendVerificationEmail, sendResetPasswordEmail };
