const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vatsalpanara9@gmail.com",
        pass: "123456",
    },
});

module.exports.sendOtp = (to,otp) => {
    let mailOptions = {
        from: "vatsalpanara9@gmail.com",
        to: to,
        subject: "Your OTP is Here",
        text:`your otp is ${otp}`,
    };

    transport.sendMail(mailOptions, (err) => {
        err && console.log(err);
    });
};
