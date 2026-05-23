import nodemailer from "nodemailer"

const transporter = nodemailer.createTestAccount({
    host:"example@yoof.com",
    port: 587,
    secure: true,
    auth:{
        user: `${process.env.SMTP_USER}`,
        pass:`${process.env.SMTP_PASS}`
    }
})

const sendMail = async(from, subject, to)=>{
    await transporter.sendMail({
        from: `${SMTP_FROM_EMAIL}`,
        to,
        subject,
        html
    })
}

export {sendMail}